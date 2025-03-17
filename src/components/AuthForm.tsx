import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { useTheme } from '../contexts/ThemeContext';

export function AuthForm() {
  const { isDark } = useTheme();

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#2563eb',
              brandAccent: '#1d4ed8',
            },
          },
        },
        className: {
          container: 'w-full',
          button: 'w-full px-4 py-2 rounded-lg font-medium transition-colors',
          input: 'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500',
        },
      }}
      theme={isDark ? 'dark' : 'light'}
      providers={['google']}
      redirectTo={`${window.location.origin}/welcome`}
      onlyThirdPartyProviders={false}
    />
  );
}