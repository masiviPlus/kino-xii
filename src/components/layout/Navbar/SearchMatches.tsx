import type { SearchMovie } from '../../../lib/api/movies';
import MovieInSearch from './MovieInSearch';
import './SearchMatches.scss';

interface SearchMatchesProps {
  movies: SearchMovie[];
}

export default function SearchMatches({ movies }: SearchMatchesProps) {
  return (
    <div className="search-results__matches">
      <div className="search-header">
              <h3 className="overline">FILMS & EVENTS</h3>
              <p className="body-s">{movies.length} results</p>
      </div>
      {movies.map((movie) => (
        <MovieInSearch
          key={movie.id}
          movie={movie}
          className="search-results__match"
        />
      ))}
    </div>
  );
}