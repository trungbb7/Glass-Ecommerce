import SearchResultItem from "../SearchResultItem/SearchResultItem";

export default function SearchResult() {
  return (
    <ul className="absolute w-full left-0 bottom-0 max-h-82 overflow-y-auto translate-y-full px-1 py-2 bg-white shadow ">
      <SearchResultItem />
      <SearchResultItem />
      <SearchResultItem />
    </ul>
  );
}
