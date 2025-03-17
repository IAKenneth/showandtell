import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Volver</span>
    </button>
  );
}

export function Footer() {
  return (
    <footer className="text-center py-4 text-sm text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-center items-center mb-2">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/8d/CEUTEC_HONDURAS.png"
          alt="CEUTEC Honduras"
          className="h-8 w-auto"
        />
      </div>
      <p>Desarrollado en San Pedro Sula, Honduras</p>
      <p>© 2025 Honduras IA. Todos los derechos reservados.</p>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a 
      href="https://api.whatsapp.com/send?phone=+50489424660&text=Hola,%20quiero%20usar%20la%20IA%20de%20Honduras%20IA%202025" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25d366] text-white p-4 rounded-full shadow-lg hover:bg-[#128c7e] transition-colors duration-200 flex items-center space-x-2 z-50"
    >
      <img 
        src="https://img.icons8.com/color/48/whatsapp--v1.png" 
        alt="WhatsApp" 
        className="w-6 h-6"
      />
      <span className="font-medium">Usa nuestra IA en WhatsApp</span>
    </a>
  );
}