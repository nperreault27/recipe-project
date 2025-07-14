import SearchAndFilterBar from '@/components/SearchAndFilterBar';
import SearchResults from '@/components/SearchResults';
export const Search = ({ searchParams }) => {
  return (
    <>
      <SearchAndFilterBar />
      <SearchResults searchParams={searchParams} />
    </>
  );
};
export default Search;
