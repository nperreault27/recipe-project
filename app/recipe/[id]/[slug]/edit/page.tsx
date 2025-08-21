import { EditRecipe } from '@/components/EditRecipe';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const resolvedParams = await params;

  return (
    <main className='min-h-screen flex flex-col items-center'>
      <EditRecipe id={resolvedParams.id} />
    </main>
  );
}
