import React, { useState } from 'react';
import { BackButton, Footer, WhatsAppButton } from './common';
import { useTheme } from '../contexts/ThemeContext';
import { Mail, Check, ArrowRight, Zap, Building2, Rocket, Calendar, CreditCard, Users, Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

function PricingPage() {
  const { isDark, toggleTheme } = useTheme();
  const [isAnnual, setIsAnnual] = useState(false);
  
  const handleSubscribe = (plan: string) => {
    toast.success(`Has seleccionado el plan ${plan}. Te contactaremos pronto.`);
  };

  const plans = {
    basic: {
      monthly: 1200,
      annual: 12000,
      save: 2400
    },
    pro: {
      monthly: 1500,
      annual: 15000,
      save: 3000
    },
    enterprise: {
      monthly: 1700,
      annual: 17000,
      save: 3400
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'}`}>
      <nav className={`backdrop-blur-lg ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'} border-b p-4 sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BackButton />
            <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Planes y Precios</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Cambiar tema"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
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

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
            Planes diseñados para tu negocio 🚀
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
          
          {/* Toggle Anual/Mensual */}
          <div className="inline-flex items-center justify-center space-x-4 mb-12 p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <span className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${!isAnnual ? 'bg-white dark:bg-gray-700 text-blue-600 font-semibold shadow-md' : 'text-gray-500'}`}>Mensual</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isAnnual ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-md ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${isAnnual ? 'bg-white dark:bg-gray-700 text-blue-600 font-semibold shadow-md' : 'text-gray-500'}`}>
              Anual <span className="text-green-500 font-medium">(20% descuento)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan Básico */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl text-white">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Básico</h3>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">L. {isAnnual ? plans.basic.annual.toLocaleString('es-HN') : plans.basic.monthly.toLocaleString('es-HN')}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">{isAnnual ? '/año' : '/mes'}</span>
                </div>
                {isAnnual && (
                  <div className="mt-3 text-green-500 text-sm font-medium">
                    Ahorra L. {plans.basic.save.toLocaleString('es-HN')} al año
                  </div>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  Hasta 1,000 mensajes/mes
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  Archivos adjuntos básicos
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  Soporte por email
                </li>
              </ul>
              <button
                onClick={() => handleSubscribe('Básico')}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <CreditCard className="w-5 h-5" />
                <span>Comenzar ahora</span>
              </button>
            </div>
          </div>

          {/* Plan Pro */}
          <div className="group relative bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-2xl p-8 transform scale-105">
            <div className="absolute inset-0 bg-white/5 rounded-3xl" />
            <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-sm font-medium px-4 py-2 rounded-tr-3xl rounded-bl-3xl">
              Más Popular 🌟
            </div>
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Pro</h3>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-white">L. {isAnnual ? plans.pro.annual.toLocaleString('es-HN') : plans.pro.monthly.toLocaleString('es-HN')}</span>
                  <span className="text-blue-200 ml-2">{isAnnual ? '/año' : '/mes'}</span>
                </div>
                {isAnnual && (
                  <div className="mt-3 text-yellow-400 text-sm font-medium">
                    Ahorra L. {plans.pro.save.toLocaleString('es-HN')} al año
                  </div>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white">
                  <Check className="w-5 h-5 text-yellow-400 mr-3" />
                  Hasta 5,000 mensajes/mes
                </li>
                <li className="flex items-center text-white">
                  <Check className="w-5 h-5 text-yellow-400 mr-3" />
                  Todos los tipos de archivos
                </li>
                <li className="flex items-center text-white">
                  <Check className="w-5 h-5 text-yellow-400 mr-3" />
                  Soporte prioritario
                </li>
                <li className="flex items-center text-white">
                  <Check className="w-5 h-5 text-yellow-400 mr-3" />
                  API Access
                </li>
              </ul>
              <button
                onClick={() => handleSubscribe('Pro')}
                className="w-full py-4 px-6 bg-white hover:bg-gray-100 text-blue-600 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Rocket className="w-5 h-5" />
                <span>Comenzar ahora</span>
              </button>
            </div>
          </div>

          {/* Plan Empresarial */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Empresarial</h3>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">L. {isAnnual ? plans.enterprise.annual.toLocaleString('es-HN') : plans.enterprise.monthly.toLocaleString('es-HN')}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">{isAnnual ? '/año' : '/mes'}</span>
                </div>
                {isAnnual && (
                  <div className="mt-3 text-green-500 text-sm font-medium">
                    Ahorra L. {plans.enterprise.save.toLocaleString('es-HN')} al año
                  </div>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  Mensajes ilimitados
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  Funciones avanzadas
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  Soporte 24/7
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  Personalización completa
                </li>
              </ul>
              <button
                onClick={() => handleSubscribe('Empresarial')}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Users className="w-5 h-5" />
                <span>Contactar ventas</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
                  ¿Necesitas un plan personalizado? 🎯
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Contáctanos para crear un plan que se ajuste perfectamente a tus necesidades específicas.
                </p>
                <button
                  onClick={() => handleSubscribe('Personalizado')}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Mail className="w-5 h-5" />
                  <span>Hablar con un experto</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://bot-whatsapp.netlify.app/build/q-76efce59.avif"
                  alt="Contact sales"
                  className="w-72 h-72 object-contain transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default PricingPage;