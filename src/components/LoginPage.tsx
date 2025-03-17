import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Github, LogIn, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Footer } from './common';
import { signUpWithEmail } from '../lib/supabase';
import toast from 'react-hot-toast';

function LoginPage() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const { login, loginWithGoogle } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const formRef = React.useRef<HTMLDivElement>(null);

  const toggleForm = () => {
    if (formRef.current) {
      formRef.current.classList.add('animate-shake');
      setTimeout(() => {
        setIsLogin(!isLogin);
        formRef.current?.classList.remove('animate-shake');
      }, 150);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (password !== confirmPassword) {
          toast.error('Las contraseñas no coinciden');
          return;
        }
        await signUpWithEmail(email, password);
        toast.success('Cuenta creada exitosamente. Por favor, inicia sesión.');
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Error en la autenticación');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1a1b1e] flex flex-col">
      <nav className={`border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Honduras IA 2025</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDark 
                  ? 'bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              } transition-colors`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <img 
              src={isDark 
                ? "https://www.unitec.edu/res/img/logo-unitec-blanco.webp?v=1.0.1"
                : "https://upload.wikimedia.org/wikipedia/commons/8/8d/CEUTEC_HONDURAS.png"}
              alt="Logo"
              className="h-8 w-auto"
            />
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src={isDark 
                  ? "https://www.unitec.edu/res/img/logo-unitec-blanco.webp?v=1.0.1"
                  : "https://upload.wikimedia.org/wikipedia/commons/8/8d/CEUTEC_HONDURAS.png"}
                alt="UNITEC Logo"
                className="h-16 w-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Honduras IA 2025</h2>
            <p className="text-gray-600 dark:text-gray-400">Gestión de Servicios de Contenido - CEUTEC 2025</p>
          </div>

          <div 
            ref={formRef}
            className="bg-white dark:bg-[#25262b] rounded-xl p-8 shadow-lg transition-all duration-300"
          >
            <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  isLogin 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  !isLogin 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Registrarse
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre de Usuario
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-[#2c2d31] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Ingresa tu nombre de usuario"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-[#2c2d31] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingresa tu email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-[#2c2d31] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-[#2c2d31] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Confirma tu contraseña"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                <LogIn className="w-4 h-4 ml-2" />
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#25262b] text-gray-500 dark:text-gray-400">
                    O continuar con
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-3">
                <button
                  onClick={() => loginWithGoogle()}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2c2d31] transition-colors"
                >
                  <img 
                    src="https://www.google.com/favicon.ico" 
                    alt="Google" 
                    className="w-5 h-5"
                  />
                </button>
                <button
                  onClick={() => toast.error('Función no disponible')}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2c2d31] transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-900 dark:text-white" />
                </button>
                <button
                  onClick={() => toast.error('Función no disponible')}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2c2d31] transition-colors"
                >
                  <img 
                    src="https://www.microsoft.com/favicon.ico" 
                    alt="Microsoft" 
                    className="w-5 h-5"
                  />
                </button>
                <button
                  onClick={() => toast.error('Función no disponible')}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2c2d31] transition-colors"
                >
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1eE-d3SDeTgEhXBGB6X58yh02gUFEJtikVA&s" 
                    alt="UNITEC" 
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-[#25262b] text-gray-500 dark:text-gray-400">
                      O usar cuenta de prueba
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-5 gap-3">
                  <button
                    onClick={() => login('admin', 'admin')}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2c2d31] transition-colors"
                  >
                    <span className="text-sm">Admin</span>
                  </button>
                  <button
                    onClick={() => login('kenneth', 'kenneth')}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2c2d31] transition-colors"
                  >
                    <span className="text-sm">Kenneth</span>
                  </button>
                  <button
                    onClick={() => login('joser', 'JoseR')}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2c2d31] transition-colors"
                  >
                    <span className="text-sm">Jose R</span>
                  </button>
                  <button
                    onClick={() => login('gabriela', 'Gaby')}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2c2d31] transition-colors"
                  >
                    <span className="text-sm">Gabriela</span>
                  </button>
                  <button
                    onClick={() => login('demo@ia.com', 'demo')}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2c2d31] transition-colors"
                  >
                    <span className="text-sm">Demo</span>
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              {isLogin ? (
                <>
                  <div className="text-sm">
                    <a href="#" className="text-blue-500 hover:text-blue-400">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <div className="text-sm">
                    <button
                      onClick={toggleForm}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      Crear cuenta
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-sm w-full text-center">
                  <button
                    onClick={toggleForm}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    ¿Ya tienes cuenta? Inicia sesión
                  </button>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <p className="font-medium">Credenciales de Prueba:</p>
                <p>Usuario: kenneth / Contraseña: kenneth</p>
                <p>Usuario: admin / Contraseña: admin</p>
                <p>Usuario: joser / Contraseña: JoseR</p>
                <p>Usuario: gabriela / Contraseña: Gaby</p>
                <p>Email: demo@ia.com / Contraseña: demo</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;