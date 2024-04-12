import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const Login = () => {
    const [user, setUser] = useState(null);

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

        const token = getTokenFromUrl();

        /** Retrieve data from Spotify API */
        const getProfileData = async (token) => {
            const url = 'https://api.spotify.com/v1/me';
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return response.data;
            } catch (error) {
                console.error('Error fetching user data:', error);
                return null;
            }
        };

        /** Fetch user profile data */
        const fetchProfile = async (token) => {
            if (!token) {
                console.log('No token available.');
                return;
            }
            try {
                const profile = await getProfileData(token);
                setUser(profile);
            } catch (error) {
                console.error('Error in fetchProfile:', error);
            }
        };

        if (token) {
            fetchProfile(token);
        }
    }, []);

    /** Login to Spotify using OAuth */
    const spotifyLogin = () => {
        const authEndpoint = 'https://accounts.spotify.com/authorize';
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
        const scopes = [
            'user-library-read',
            'user-library-modify',
            'playlist-read-private',
            'playlist-modify-private',
            'playlist-modify-public',
        ];
        const url = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            '%20'
        )}&response_type=token&show_dialog=true`;
        window.location.href = url;
    };

    const spotifyLogout = () => {
        localStorage.removeItem('spotify_token');
        setUser(null);
        window.location.reload();
    };

    // TODO: user's listening stats
    const showProfile = () => {
        console.log(user);
    };

    return (
        <header className='loginHeader'>
            <div className='title'>Music Explore</div>
            {user ? (
                // user is logged in
                <div className='logoutBtn'>
                    <button onClick={showProfile} className='loginBtn userSection'>
                        <img src={user.images[0]?.url} alt={user.display_name} />
                        {user.display_name}
                    </button>
                    <button
                        onClick={spotifyLogout}
                        className='loginBtn redBtn logoutSection'>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </div>
            ) : (
                // user not logged in
                <button onClick={spotifyLogin} className='loginBtn greenBtn'>
                    Login with <FontAwesomeIcon icon={faSpotify} />
                </button>
            )}
        </header>
    );
};

export default Login;
