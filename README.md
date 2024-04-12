# Music Explore

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install

1. Clone this repo:
   `git clone https://github.com/jxne00/music-explore.git`

2. cd to project:
   `cd music-explore`

3. Install packages:
   `npm install`

4. Register application with Spotify: [Spotify for Developers](https://developer.spotify.com/dashboard)

5. Create `.env` and `.env.local`:

```
# .env
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
REACT_APP_SPOTIFY_REDIRECT_URI=https://jxne00.github.io/music-explore/

# .env.local
REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/
```

6. Run the app:
   `npm start`
