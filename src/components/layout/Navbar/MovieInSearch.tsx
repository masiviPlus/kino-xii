import Image from 'next/image';
import type { SearchMovie } from '../../../lib/api/movies';
import './MovieInSearch.scss';

interface MovieInSearchProps {
  movie: SearchMovie;
  className?: string;
}

export default function MovieInSearch({
  movie,
  className,
}: MovieInSearchProps) {
  const formattedPrice = new Intl.NumberFormat('ka-GE', {
    maximumFractionDigits: 0,
  }).format(movie.fromPrice);

  return (
    <div className={['movie-in-search', className].filter(Boolean).join(' ')}>
      
      {movie.posterUrl ? (
        <Image
          src={movie.posterUrl}
          alt=""
          width={40}
          height={56}
          sizes="48px"
          className="movie-in-search__poster"
        />
      ) : (
        <div className="movie-in-search__poster-placeholder" aria-hidden="true" />
      )}
      <div className="movie-in-search__content">
        <div className="movie-in-search__details">
            <p className="movie-in-search__title label-m">{movie.title}</p>
            <div className="movie-in-search__info">
                <p className="movie-in-search__kind body-s">{movie.kind}</p>
                <span>•</span>
                <p className="movie-in-search__age body-s">{movie.ageRating.code}</p>
                <span>•</span>
                <p className="movie-in-search__runtime body-s">{movie.runtimeMinutes} min</p>
            </div>
        </div>
        {movie.isComingSoon ? (
          <p className="movie-in-search__price label-m"> <span className="coming-soon">Coming Soon</span></p>
        ) : (
          <p className="movie-in-search__price label-m">from ₾{formattedPrice}</p>
        )}
      </div>
    </div>
  );
}