import axios from 'axios';

const BASE_URL = 'https://api.spotify.com/v1';

/**
 * Search for tracks, artists, albums, and playlists through the Spotify API
 */
// const search = async (query, token, type = 'track,artist,album,playlist') => {
//     try {
//         const { data } = await axios.get(`${BASE_URL}/search`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             params: {
//                 q: query,
//                 type: type,
//                 limit: 20,
//             },
//         });
//         return data.tracks.items.map((track) => ({
//             name: track.name,
//             image: track.album.images[0]?.url,
//             artist: track.artists.map((artist) => artist.name).join(', '),
//             releaseDate: track.album.release_date,
//         }));
//     } catch (error) {
//         console.error('Error during Spotify search:', error);
//         return [];
//     }
// };

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

        return {
            tracks: data.tracks.items.map((track) => ({
                name: track.name,
                image: track.album.images[0]?.url,
                artist: track.artists.map((artist) => artist.name).join(', '),
                releaseDate: track.album.release_date,
            })),
            artists: data.artists.items.map((artist) => ({
                name: artist.name,
                image: artist.images[0]?.url,
                followers: artist.followers.total,
                genres: artist.genres,
            })),
            albums: data.albums.items.map((album) => ({
                name: album.name,
                image: album.images[0]?.url,
                artist: album.artists.map((artist) => artist.name).join(', '),
                releaseDate: album.release_date,
            })),
            playlists: data.playlists.items.map((playlist) => ({
                name: playlist.name,
                image: playlist.images[0]?.url,
                owner: playlist.owner.display_name,
                totalTracks: playlist.tracks.total,
            })),
        };
    } catch (error) {
        console.error('Error during Spotify search:', error);
        return {};
    }
};

export { search };
