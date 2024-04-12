import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    return (
        <form onSubmit={handleSearch} className='searchBox'>
            <input
                type='text'
                placeholder='Search for a song, album, or artist'
                value={searchTerm}
                onChange={handleChange}
            />
            <button type='submit'>Search</button>
        </form>
    );
};

export default Search;
