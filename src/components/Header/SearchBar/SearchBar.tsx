import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchResultItem from "../SearchResultItem/SearchResultItem";
import {
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/types/product";
import { useClickOutside } from "@/hooks/customhooks";

export default function SearchBar() {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  useClickOutside(searchBarRef, () => {
    setVisible(false);
  });

  useEffect(() => {
    if (query.trim().length < 2) {
      setSearchResult([]);
      setLoading(false);
      return;
    }

    // Init debounce
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/products?q=${encodeURIComponent(query)}`,
        );
        const resultObj = (await response.json()) as Product[];
        setSearchResult(resultObj);
      } catch (error) {
        console.error("Fetch error:", error);
        setSearchResult([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div
      ref={searchBarRef}
      className="relative flex items-center bg-primary-light p-2.5 rounded-xl border-3 border-transparent has-focus:border-gray-300 transition-colors duration-200 ease-linear"
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-gray-400 mr-3"
      />
      <input
        id="search"
        className="outline-none text-sm text-gray-400 w-120"
        type="text"
        placeholder="Search products"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onFocus={() => setVisible(true)}
      />

      {isVisible && (
        <ul className="absolute w-full left-0 bottom-0 max-h-82 overflow-y-auto translate-y-full px-1 py-2 bg-white shadow ">
          {isLoading && (
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          )}

          {!isLoading && (
            <>
              {searchResult.map((product) => (
                <SearchResultItem product={product} key={product.id} />
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
