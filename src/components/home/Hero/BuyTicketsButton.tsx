import Image from 'next/image';
import type { FeaturedMovie } from '../../../lib/api/movies';

interface BuyTicketsButtonProps {
  movie: FeaturedMovie;
}

export default function BuyTicketsButton({ movie }: BuyTicketsButtonProps) {
  return (
    <button
      className="hero__button hero__button--primary"
      type="button"
      aria-label={`Buy tickets for ${movie.title}`}
    >
      <Image
        src="/icons/Vector.svg"
        alt=""
        width={16}
        height={16}
        aria-hidden="true"
      />
      Buy tickets
    </button>
  );
}