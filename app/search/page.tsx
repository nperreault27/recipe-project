import SearchAndFilterBar from '@/components/SearchAndFilterBar';
import SearchResults from '@/components/SearchResults';
import { Stack } from '@mantine/core';
export type SearchParams = {
  recipeName?: string;
  ingredients?: string;
  [key: string]: string | undefined;
};

const RecipeSearch = ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  return (
    <Stack p={'md'}>
      <SearchAndFilterBar />
      <SearchResults searchParams={searchParams} />
    </Stack>
  );
};
export default RecipeSearch;
