'use client';

import { Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

const SavedRecipePage = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };
    getUser();
  }, [supabase]);

  return (
    <Stack w="100%">
      {loading ? (
        <Text>Loading your saved recipes...</Text>
      ) : user ? (
        <Text>Your saved recipes, {user.email}!</Text>
      ) : (
        <Text>Please log in to view your saved recipes.</Text>
      )}
    </Stack>
  );
};

export default SavedRecipePage;
