import { EditRecipe } from '@/components/EditRecipe';
import { Suspense } from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const resolvedParams = await params;

  return (
    <main className='min-h-screen flex flex-col items-center'>
        <Suspense fallback={<div>Loading...</div>}>
            <EditRecipe id={resolvedParams.id} />
        </Suspense>
    </main>
  );
}
