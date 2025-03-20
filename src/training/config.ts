export interface AIConfig {
  name: string;
  version: string;
  company: string;
  location: string;
  language: string;
  model: string;
  parameters: AIParameters;
}

export interface AIParameters {
  temperature: number;
  top_p: number;
  repetition_penalty: number;
  top_k: number;
  do_sample: boolean;
  max_new_tokens: number;
  stop: string[];
  return_full_text: boolean;
  use_cache: boolean;
}

export const DEFAULT_CONFIG: AIConfig = {
  name: "Bot de Honduras - IA",
  version: "2025.1.0",
  company: "Honduras IA",
  location: "San Pedro Sula, Honduras",
  language: "Español (Honduras)",
  model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  parameters: {
    temperature: 0.7,
    top_p: 0.9,
    repetition_penalty: 1.1,
    top_k: 40,
    do_sample: true,
    max_new_tokens: 1000,
    stop: ["Human:", "Assistant:", "User:", "Bot:"],
    return_full_text: false,
    use_cache: true
  }
}; 