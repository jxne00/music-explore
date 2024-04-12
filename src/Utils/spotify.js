import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';

/**
 * Search for tracks, artists, albums, and playlists through the Spotify API
 */
const search = async (query, token, type = 'track,artist,album,playlist') => {
    try {
        const { data } = await axios.get(`${BASE_URL}/search`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: query,
                type: type,
                limit: 20,
            },
        });
        return data.tracks.items.map((track) => ({
            name: track.name,
            image: track.album.images[0]?.url,
            artist: track.artists.map((artist) => artist.name).join(', '),
            releaseDate: track.album.release_date,
            description: track.album.name,
        }));
    } catch (error) {
        console.error('Error during Spotify search:', error);
        return [];
    }
};

export { search };
