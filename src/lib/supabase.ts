import { createClient } from '@supabase/supabase-js';

// Create Supabase client singleton
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Auth functions
export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/welcome`
    }
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Chat history functions
export const saveChatHistory = async (userId: string, messages: any[]) => {
  try {
    // First check if a record exists
    const { data: existing, error: queryError } = await supabase
      .from('chat_history')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (queryError && queryError.code !== 'PGRST116') {
      throw queryError;
    }

    if (existing) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('chat_history')
        .update({ 
          messages,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (updateError) throw updateError;
    } else {
      // Insert new record
      const { error: insertError } = await supabase
        .from('chat_history')
        .insert({ 
          user_id: userId,
          messages,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (insertError) throw insertError;
    }
  } catch (error: any) {
    console.error('Error saving chat history:', error);
    throw new Error(`Failed to save chat history: ${error.message}`);
  }
};

export const getChatHistory = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .select('messages')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No records found, return empty array
        return [];
      }
      throw error;
    }

    return data?.messages || [];
  } catch (error: any) {
    console.error('Error fetching chat history:', error);
    throw new Error(`Failed to fetch chat history: ${error.message}`);
  }
};

export const clearChatHistory = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('chat_history')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error: any) {
    console.error('Error clearing chat history:', error);
    throw new Error(`Failed to clear chat history: ${error.message}`);
  }
};