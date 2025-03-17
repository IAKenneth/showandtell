import { HfInference } from '@huggingface/inference';
import { AI_SYSTEM_PROMPT, AI_PARAMETERS } from '../config/ai-training';

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
    
    // Prepare the prompt
    const prompt = `${AI_SYSTEM_PROMPT}\n\nConversation:\n${conversation}\n\nAssistant: ${ticketPrefix}`;

    console.log('Enviando solicitud a Hugging Face...');
    
    // Make API call with timeout
    const response = await Promise.race([
      hf.textGeneration({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        inputs: prompt,
        parameters: {
          ...AI_PARAMETERS,
          max_new_tokens: 1000,
          temperature: 0.7,
          return_full_text: false
        }
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout en la solicitud a la API')), 30000)
      )
    ]);

    console.log('Respuesta recibida de Hugging Face');
    
    let reply = response.generated_text.trim();
    
    // Clean up response
    if (reply.startsWith('Assistant:')) {
      reply = reply.substring('Assistant:'.length).trim();
    }
    
    // Remove any system prompt that might have been echoed
    if (reply.includes('Eres un asistente')) {
      reply = reply.split('\n').filter(line => !line.includes('Eres un asistente')).join('\n').trim();
    }

    // Handle empty responses
    if (!reply) {
      return "Lo siento, no pude generar una respuesta. ¿Podrías reformular tu pregunta?";
    }

    // Truncate if too long
    if (reply.length > 1000) {
      reply = reply.substring(0, 1000) + '...\n\n¿Deseas que continúe con más detalles?';
    }

    return reply;
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
    
    return "⚠️ Error en el sistema. Por favor, intente nuevamente en unos momentos.";
  }
};