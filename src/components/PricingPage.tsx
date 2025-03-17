import React from 'react';
import { BackButton, Footer, WhatsAppButton } from './common';
import { useTheme } from '../contexts/ThemeContext';
import { Mail, Check, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

function PricingPage() {
  const { isDark } = useTheme();
  
  const handleSubscribe = (plan: string) => {
    toast.success(`Has seleccionado el plan ${plan}. Te contactaremos pronto.`);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <nav className={`border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BackButton />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Planes y Precios</h1>
          </div>
          <img 
            src={isDark 
              ? "https://www.unitec.edu/res/img/logo-unitec-blanco.webp?v=1.0.1"
              : "https://upload.wikimedia.org/wikipedia/commons/8/8d/CEUTEC_HONDURAS.png"}
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Planes diseñados para tu negocio
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan Básico */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Básico</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">$29</span>
              <span className="text-gray-500 dark:text-gray-400">/mes</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Hasta 1,000 mensajes/mes
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Archivos adjuntos básicos
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Soporte por email
              </li>
            </ul>
            <button
              onClick={() => handleSubscribe('Básico')}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Comenzar
            </button>
          </div>

          {/* Plan Pro */}
          <div className="bg-blue-600 rounded-2xl shadow-xl p-8 transform scale-105">
            <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-sm font-medium px-3 py-1 rounded-tr-2xl rounded-bl-2xl">
              Popular
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$79</span>
              <span className="text-blue-200">/mes</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-white">
                <Check className="w-5 h-5 text-yellow-400 mr-2" />
                Hasta 5,000 mensajes/mes
              </li>
              <li className="flex items-center text-white">
                <Check className="w-5 h-5 text-yellow-400 mr-2" />
                Todos los tipos de archivos
              </li>
              <li className="flex items-center text-white">
                <Check className="w-5 h-5 text-yellow-400 mr-2" />
                Soporte prioritario
              </li>
              <li className="flex items-center text-white">
                <Check className="w-5 h-5 text-yellow-400 mr-2" />
                API Access
              </li>
            </ul>
            <button
              onClick={() => handleSubscribe('Pro')}
              className="w-full py-3 px-4 bg-white hover:bg-gray-100 text-blue-600 rounded-lg font-medium transition-colors"
            >
              Comenzar
            </button>
          </div>

          {/* Plan Empresarial */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Empresarial</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">$199</span>
              <span className="text-gray-500 dark:text-gray-400">/mes</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Mensajes ilimitados
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Funciones avanzadas
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Soporte 24/7
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Personalización completa
              </li>
            </ul>
            <button
              onClick={() => handleSubscribe('Empresarial')}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Contactar ventas
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ¿Necesitas un plan personalizado?
          </p>
          <button
            onClick={() => handleSubscribe('Personalizado')}
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <Mail className="w-5 h-5" />
            <span>Contáctanos</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default PricingPage;