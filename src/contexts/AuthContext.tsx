import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase, signInWithEmail, signInWithGoogle, signOut } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; username: string } | null;
  login: (identifier: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

// Usuarios de prueba
const TEST_USERS = [
  { username: 'admin', email: 'admin@test.com', password: 'admin' },
  { username: 'kenneth', email: 'kenneth@ia.com', password: 'kenneth' },
  { username: 'joser', email: 'joser@demo.com', password: 'JoseR' },
  { username: 'gabriela', email: 'gabriela@demo.com', password: 'Gaby' },
  { username: 'demo', email: 'demo@ia.com', password: 'demo' },
];

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<{ email: string; username: string } | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Verificar sesión activa de Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setUser({
          email: session.user.email || '',
          username: session.user.email?.split('@')[0] || ''
        });
      }
    });

    // Escuchar cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setUser({
          email: session.user.email || '',
          username: session.user.email?.split('@')[0] || ''
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      // Primero intentar con usuarios de prueba
      const testUser = TEST_USERS.find(
        u => (u.email.toLowerCase() === identifier.toLowerCase() || 
             u.username.toLowerCase() === identifier.toLowerCase()) && 
             u.password === password
      );

      if (testUser) {
        setIsAuthenticated(true);
        setUser({ email: testUser.email, username: testUser.username });
        navigate('/welcome');
        toast.success('¡Bienvenido!');
        return;
      }

      // Si no es usuario de prueba, intentar con Supabase
      const { data: { user: supabaseUser } } = await signInWithEmail(identifier, password);
      
      if (supabaseUser) {
        setIsAuthenticated(true);
        setUser({
          email: supabaseUser.email || '',
          username: supabaseUser.email?.split('@')[0] || ''
        });
        navigate('/welcome');
        toast.success('¡Bienvenido!');
      }
    } catch (error: any) {
      console.error('Error de inicio de sesión:', error);
      toast.error('Credenciales inválidas');
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      // La redirección la maneja OAuth
    } catch (error: any) {
      console.error('Error de inicio de sesión con Google:', error);
      toast.error('Error al iniciar sesión con Google');
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
      toast.success('Sesión cerrada exitosamente');
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};