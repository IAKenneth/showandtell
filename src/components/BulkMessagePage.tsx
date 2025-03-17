import React from 'react';
import { BackButton, Footer, WhatsAppButton } from './common';
import { useTheme } from '../contexts/ThemeContext';
import { Send, Upload, FileText, Image, Video, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

function BulkMessagePage() {
  const { isDark } = useTheme();
  const [numbers, setNumbers] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [interval, setInterval] = React.useState(6);
  const [randomDelay, setRandomDelay] = React.useState(10);
  const [attachments, setAttachments] = React.useState<File[]>([]);
  const [sending, setSending] = React.useState(false);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setAttachments(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.webm'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numbers.trim()) {
      toast.error('Por favor ingresa al menos un número de WhatsApp');
      return;
    }
    if (!message.trim() && attachments.length === 0) {
      toast.error('Por favor ingresa un mensaje o adjunta archivos');
      return;
    }

    setSending(true);
    // Simulate sending
    setTimeout(() => {
      toast.success('Mensajes enviados exitosamente');
      setSending(false);
      setNumbers('');
      setMessage('');
      setAttachments([]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className={`border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BackButton />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Mensajería Masiva</h1>
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Números de WhatsApp
              </label>
              <div className="flex space-x-2">
                <textarea
                  value={numbers}
                  onChange={(e) => setNumbers(e.target.value)}
                  placeholder="+country code + number1, +country code + number2"
                  className="flex-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  rows={4}
                />
                <div className="flex flex-col space-y-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mensaje
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Archivos Adjuntos
              </label>
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                  ${isDragActive 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500'}`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex space-x-2">
                    <Image className="w-6 h-6 text-gray-400" />
                    <Video className="w-6 h-6 text-gray-400" />
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Arrastra archivos aquí o haz clic para seleccionar
                  </p>
                </div>
              </div>
              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Intervalo de Envío (segundos)
                </label>
                <input
                  type="number"
                  value={interval}
                  onChange={(e) => setInterval(parseInt(e.target.value))}
                  min="1"
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Retraso Aleatorio (segundos)
                </label>
                <input
                  type="number"
                  value={randomDelay}
                  onChange={(e) => setRandomDelay(parseInt(e.target.value))}
                  min="0"
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => {
                  setNumbers('');
                  setMessage('');
                  setAttachments([]);
                }}
              >
                Limpiar
              </button>
              <button
                type="submit"
                disabled={sending}
                className={`px-6 py-2 bg-green-500 text-white rounded-lg flex items-center space-x-2
                  ${sending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'} transition-colors`}
              >
                <Send className="w-5 h-5" />
                <span>{sending ? 'Enviando...' : 'Enviar Mensajes'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default BulkMessagePage;