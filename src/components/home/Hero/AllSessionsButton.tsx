import type { FeaturedMovie } from '../../../lib/api/movies';

interface AllSessionsButtonProps {
  movie: FeaturedMovie;
}

export default function AllSessionsButton({ movie }: AllSessionsButtonProps) {
  return (
    <button
      className="hero__button"
      type="button"
      aria-label={`All sessions for ${movie.title}`}
    >
      All sessions
    </button>
  );
}