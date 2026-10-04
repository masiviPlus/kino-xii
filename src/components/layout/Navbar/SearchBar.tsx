"use client";

import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { searchMovies, type SearchMovie } from '../../../lib/api/movies';
import NoSearchResults from './NoSearchResults';
import SearchMatches from './SearchMatches';
import './SearchBar.scss';
import EmptySearch from './EmptySearch';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [matches, setMatches] = useState<SearchMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearchError, setHasSearchError] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const showResults = isFocused;
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setMatches([]);
    setIsLoading(value.trim().length > 0);
    setHasSearchError(false);
  };

// Handling click outside of the search bar to close the results dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

// Debouncing the search input to avoid excessive API calls

  useEffect(() => {
    const query = search.trim();

    if (!query) {
      return;
    }

    const controller = new AbortController();

    const timeoutId = window.setTimeout(async () => {
      try {
        setMatches(await searchMovies(query, controller.signal));
      } catch {
        if (!controller.signal.aborted) {
          setMatches([]);
          setHasSearchError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search]);

  return (
    <div className="search-bar-wrapper" ref={searchBarRef}>
      <div className="search-bar">
        <Search className="search-bar__icon" size={20} />

        <input
          type="search"
          placeholder="Search films and live events"
          value={search}
          onChange={(event) => handleSearchChange(event.target.value)}
          onFocus={() => setIsFocused(true)}
        />

        {search && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={() => setSearch('')}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}

        {showResults && (
          <div className="search-results">
            {search.trim() === '' ? (
              <EmptySearch/>
            ) : isLoading ? (
              <div className="search-results__empty">
                <p className="body-m">Searching...</p>
              </div>
            ) : hasSearchError ? (
              <div className="search-results__empty">
                <p className="label-m">Search is unavailable</p>
                <p className="body-m">Please try again.</p>
              </div>
            ) : matches.length > 0 ? (
              <SearchMatches movies={matches} />
            ) : (
              <NoSearchResults query={search} />
            )}
            <div className="icon-bg" />
          </div>
        )}
      </div>
    </div>
  );
}