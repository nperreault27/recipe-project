import { EditRecipe } from '@/components/EditRecipe';

export default function Page({ params }: { params: { id: string; slug: string } }) {
  return (
    <main className='min-h-screen flex flex-col items-center'>
      <EditRecipe id={params.id} />
    </main>
  );
}
