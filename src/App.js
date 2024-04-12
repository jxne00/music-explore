import React, { useState, useEffect } from 'react';
import Login from './Components/Login/Login';
import Search from './Components/Search/Search';
import Results from './Components/Results/Results';
import { search as spotifySearch } from './Utils/spotify';
import './App.css';

function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [token, setToken] = useState();
    const [searchMade, setSearchMade] = useState(false);

    useEffect(() => {
        /** Extract token from the URL */
        const getTokenFromUrl = () => {
            const hash = window.location.hash;
            let token = localStorage.getItem('spotify_token');

            if (!token && hash) {
                token = hash
                    .substring(1)
                    .split('&')
                    .find((elem) => elem.startsWith('access_token'))
                    .split('=')[1];
                localStorage.setItem('spotify_token', token);
                window.location.hash = '';
            }
            return token;
        };

        setToken(getTokenFromUrl());
    }, []);

    /**
     * Start the search process and update the search results
     */
    const handleSearch = async (query) => {
        setSearchMade(true);

        if (!token) {
            console.log('No token available');
            return;
        }
        const results = await spotifySearch(query, token);
        if (results) {
            setSearchResults(results);
        }
    };

    return (
        <div className='App'>
            <Login />
            <Search onSearch={handleSearch} />
            <Results results={searchResults} searchMade={searchMade} />
        </div>
    );
}

export default App;
