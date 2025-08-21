import { EditRecipe } from '@/components/EditRecipe';
import React from 'react';

export default function Page({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const [resolvedParams, setResolvedParams] = React.useState<{ id: string; slug: string } | null>(null);

  React.useEffect(() => {
    (async () => {
      setResolvedParams(await params);
    })();
  }, [params]);

  if (!resolvedParams) return <div>Loading...</div>;

  return (
    <main className='min-h-screen flex flex-col items-center'>
      <EditRecipe id={resolvedParams.id} />
    </main>
  );
}
