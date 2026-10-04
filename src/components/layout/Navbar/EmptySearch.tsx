import "./SearchBar.scss";
import Image from 'next/image';
import BrowseAll from './BrowseAll';

export default function EmptySearch() {
    return (
        <div className="search-results__empty">
                        
            <div className="icon-wrapper">
              <Image
                src="/icons/boxicons_popcorn.svg"
                alt="Popcorn"
                className="search-results__icon"
                width={40}
                height={40}
                />
            </div>
        
            <p className="label-m">What do you want to watch?</p>
            <p className="body-m">Search by title, director or cast</p>
        
            <BrowseAll />
            </div>
            )
}