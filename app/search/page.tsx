import SearchAndFilterBar from '@/components/SearchAndFilterBar';
import SearchResults from '@/components/SearchResults';
import { Stack } from '@mantine/core';
export const Search = ({ searchParams }) => {
  return (
    <Stack p={'md'}>
      <SearchAndFilterBar />
      <SearchResults searchParams={searchParams} />
    </Stack>
  );
};
export default Search;
