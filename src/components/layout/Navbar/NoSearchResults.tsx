import Image from 'next/image';
import BrowseAll from './BrowseAll';

interface NoSearchResultsProps {
  query: string;
}

export default function NoSearchResults({ query }: NoSearchResultsProps) {
  return (
    <div className="search-results__empty">
      <div className="icon-wrapper">
        <Image
          src="/icons/MagnifyingGlass.svg"
          alt=""
          className="search-results__icon"
          width={20}
          height={20}
        />
      </div>
      <p className="label-m">No results for &quot;{query}&quot;</p>
      <p className="body-m">
        Check the spelling or try another film or live event
      </p>

      <BrowseAll />
    </div>
  );
}