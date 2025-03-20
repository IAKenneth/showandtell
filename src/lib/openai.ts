import { HfInference } from '@huggingface/inference';
import { AI_SYSTEM_PROMPT } from '../training/system-prompt';
import { DEFAULT_CONFIG } from '../training/config';

// Verificar que la clave de API existe
const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
if (!apiKey) {
  console.error('Error: VITE_HUGGINGFACE_API_KEY no está configurada en el archivo .env');
}

const hf = new HfInference(apiKey);

// Sistema de tickets
let ticketCounter = 1;

const getNextTicketNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const sequence = String(ticketCounter++).padStart(6, '0');
  return `HON-${year}-${sequence}`;
};

// Función para limpiar y formatear el texto
const cleanResponse = (text: string): string => {
  // Eliminar prefijos comunes
  text = text.replace(/^(Assistant:|Asistente:|Bot:|User:|Human:)/i, '').trim();
  
  // Eliminar cualquier prompt del sistema que se haya filtrado
  if (text.includes('Eres un asistente')) {
    text = text.split('\n').filter(line => !line.includes('Eres un asistente')).join('\n').trim();
  }
  
  // Eliminar espacios múltiples
  text = text.replace(/\s+/g, ' ');
  
  // Asegurar que el texto no esté vacío
  if (!text) {
    return "Lo siento, no pude generar una respuesta. ¿Podrías reformular tu pregunta?";
  }
  
  return text;
};

interface HfResponse {
  generated_text: string;
}

export const chatCompletion = async (messages: any[]) => {
  try {
    if (!apiKey) {
      throw new Error('API key no configurada');
    }

    // Take only the last 6 messages for context
    const recentMessages = messages.slice(-6);
    
    // Format conversation for the model
    const conversation = recentMessages
      .map(msg => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n\n');
    
    // Add ticket number for new conversations
    const isNewIssue = messages.length <= 2;
    const ticketPrefix = isNewIssue ? `[Ticket ${getNextTicketNumber()}]\n\n` : '';
    
    // Prepare the prompt with context
    const prompt = `${AI_SYSTEM_PROMPT}\n\nConversation:\n${conversation}\n\nAssistant: ${ticketPrefix}`;

    console.log('Enviando solicitud a Hugging Face...');
    
    // Make API call with timeout and retry logic
    let retries = 3;
    let lastError = null;

    while (retries > 0) {
      try {
        const response = await Promise.race([
          hf.textGeneration({
            model: DEFAULT_CONFIG.model,
            inputs: prompt,
            parameters: {
              ...DEFAULT_CONFIG.parameters,
              max_new_tokens: 1000,
              temperature: 0.7,
              return_full_text: false,
              stop: ["Human:", "Assistant:", "User:", "Bot:"]
            }
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout en la solicitud a la API')), 30000)
          )
        ]) as HfResponse;

        console.log('Respuesta recibida de Hugging Face');
        
        let reply = cleanResponse(response.generated_text.trim());
        
        // Truncate if too long
        if (reply.length > 1000) {
          reply = reply.substring(0, 1000) + '...\n\n¿Deseas que continúe con más detalles?';
        }

        return reply;
      } catch (error: any) {
        lastError = error;
        retries--;
        
        if (retries > 0) {
          console.log(`Intento fallido, reintentando... (${retries} intentos restantes)`);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar 2 segundos antes de reintentar
        }
      }
    }

    throw lastError;
  } catch (error: any) {
    console.error('Error detallado en chat completion:', error);
    
    // Handle specific error cases
    if (error?.response?.status === 429) {
      return "🔧 Sistema sobrecargado. Por favor, espere unos minutos e intente nuevamente.";
    }
    
    if (error?.response?.status === 413) {
      return "📝 Mensaje demasiado extenso. Por favor, resuma su consulta.";
    }

    if (error?.response?.status === 401) {
      return "🔑 Error de autenticación. Por favor verifique que la clave de API sea válida.";
    }

    if (error?.message?.includes('Timeout')) {
      return "⏰ La solicitud tardó demasiado tiempo. Por favor, intente nuevamente.";
    }

    if (error?.message?.includes('Failed to fetch') || error?.message?.includes('Network')) {
      return "📡 Error de conexión. Por favor, verifique su conexión a internet e intente nuevamente.";
    }

    if (error?.message?.includes('API key no configurada')) {
      return "🔑 Error de configuración. Por favor, contacte al administrador del sistema.";
    }
    
    return "⚠️ Error en el sistema. Por favor, intente nuevamente en unos momentos.";
  }
};