// const axios = require('axios');

// const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

// const accessToken = '';
//TODO: link to the database name of artist
// const artistName = 'Artist Name'; 

// // Request to Spotify API
// axios.get(`${SPOTIFY_API_URL}/search`, {
//   params: {
//     q: artistName,
//     type: 'artist',
//   },
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// })
// .then(response => {
//   // Extract relevant information from the response
//   const artists = response.data.artists.items;

//   if (artists.length > 0) {
//     // Print information about the first matching artist
//     const firstArtist = artists[0];
//     console.log('Artist Name:', firstArtist.name);
//     console.log('Spotify ID:', firstArtist.id);
//     console.log('External URL:', firstArtist.external_urls.spotify);
//   } else {
//     console.log('No artists found matching the name:', artistName);
//   }
// })
// .catch(error => {
//   console.error('Error:', error.message);
// });