'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function UserLogger() {
  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        console.log('Current user:', {
          email: session.user.email,
          name: session.user.user_metadata?.display_name,
        });
      } else {
        console.log('No one signed in');
      }
    };

    checkUser();
  }, []);

  return null;
}
