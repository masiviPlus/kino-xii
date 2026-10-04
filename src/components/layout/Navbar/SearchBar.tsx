"use client";

import { Search } from 'lucide-react';
import './SearchBar.scss';
import  {useState}  from 'react';

export default function SearchBar() {
  const [search, setSearch] = useState('');

  return (
    <div className="search-bar">
      <Search className="search-bar__icon" size={20} />

      <input
        type="search"
        placeholder="Search films and live events"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
        <button 
            type="button"
            className="search-bar__clear"
            aria-label="Clear search"
            onClick={() => setSearch('')}
            
        > <span>×</span>
          
        </button>
    </div>
  );
}