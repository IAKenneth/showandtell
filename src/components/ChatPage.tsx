import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton, Footer, WhatsAppButton } from './common';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { MessageSquare, Send, Menu, X, Settings, LogOut, Sun, Moon, Home, Users, CreditCard, ArrowLeft } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { chatCompletion } from '../lib/openai';
import toast from 'react-hot-toast';

type MessageRole = 'user' | 'assistant';

interface Message {
  role: MessageRole;
  content: string;
  isTyping: boolean;
}

const INITIAL_MESSAGE = `[Sistema iniciando... 🤖]

¡Hola! Soy el Asistente de Honduras IA 👋

[Cargando módulos principales...]
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%

[Sistemas operativos]
✅ Soporte Técnico Empresarial
✅ Gestión de Tickets
✅ Desarrollo de Software
✅ Automatización de Procesos

¡Bienvenido a Honduras IA 2025! 🎓

Para brindarte el mejor servicio, ¿podrías decirme tu nombre y el departamento o área al que perteneces? Esto me ayudará a personalizar mejor mi asistencia. 🤝`;

function ChatPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    { 
      role: 'assistant', 
      content: INITIAL_MESSAGE, 
      isTyping: true 
    }
  ]);
  const [input, setInput] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { isDark, toggleTheme } = useTheme();

  // Auto-focus input on mount
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setInput('');
    setIsProcessing(true);

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMessage, isTyping: false },
      { role: 'assistant', content: '', isTyping: true }
    ];
    
    setMessages(newMessages.slice(0, -1));

    try {
      const response = await chatCompletion(
        newMessages
          .filter(m => !m.isTyping)
          .map(m => ({
            role: m.role,
            content: m.content
          }))
      );

      const updatedMessages: Message[] = [
        ...newMessages.slice(0, -1),
        {
          role: 'assistant',
          content: response || "Lo siento, hubo un error. Por favor, intenta nuevamente.",
          isTyping: false
        }
      ];

      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al procesar el mensaje');
    } finally {
      setIsProcessing(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-900">
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <img 
                src={isDark 
                  ? "https://www.unitec.edu/res/img/logo-unitec-blanco.webp?v=1.0.1"
                  : "https://upload.wikimedia.org/wikipedia/commons/8/8d/CEUTEC_HONDURAS.png"}
                alt="CEUTEC Logo" 
                className="h-8 w-auto"
              />
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Bot de Honduras - IA</h2>
          </div>

          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Usuario:</p>
                <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => navigate('/welcome')}
              className="flex items-center space-x-3 w-full px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Inicio</span>
            </button>
            <button
              onClick={() => navigate('/bulk-message')}
              className="flex items-center space-x-3 w-full px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Mensajería Masiva</span>
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="flex items-center space-x-3 w-full px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              <span>Planes y Precios</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-3 w-full px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="flex items-center space-x-3 w-full px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Configuración</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center space-x-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-4"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigate('/welcome')}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver</span>
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Chat con Bot de Honduras - IA</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  {message.isTyping ? (
                    <TypeAnimation
                      sequence={[message.content || '...', 1000]}
                      wrapper="div"
                      cursor={true}
                      repeat={message.content ? 1 : Infinity}
                      speed={50}
                    />
                  ) : (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                disabled={isProcessing}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isProcessing}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                <span>{isProcessing ? 'Procesando...' : 'Enviar'}</span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ChatPage;