import './config.mjs';
import express from 'express';
const app = express();
import './db.mjs';
import mongoose from 'mongoose';
const ConcertModel = mongoose.model('Concert');
const VenueModel = mongoose.model('Venue');

import url from 'url';
import path from 'path';
import SpotifyWebApi from 'spotify-web-api-node';
const router = express.Router();


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('view engine', 'hbs');


// app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: false }));

// function get_access_token(res){
//   console.log('calling getaccess token')
//   try {
//     const data = spotifyApi.refreshAccessToken();
//     data.then((data) => {
//       console.log('The access token expires in ' + data.body['expires_in']);
//       console.log('The access token is ' + data.body['access_token']);
//       console.log('The refresh token is ' + data.body['refresh_token']);
//       spotifyApi.setAccessToken(data.body['access_token']);
//       spotifyApi.setRefreshToken(data.body['refresh_token']);
//       return true;
//     });
//   } catch (err) {
//     console.log('erred')
//     console.error('Error getting access token:', err);
//     return false;
//   }
//   console.log('completed')
// }

function get_access_token() {
  console.log('calling get_access_token');
  return new Promise((resolve, reject) => {
    spotifyApi.refreshAccessToken()
      .then(data => {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        resolve(true); // Resolve the promise indicating success
      })
      .catch(err => {
        console.error('Error getting access token:', err);
        reject(false); // Reject the promise indicating failure
      });
  });
}


function checkResponse(res, req, next) {
  console.log('res.body', res.body);
  if (res.body.error.status === 401) {
    console.log('Access token expired. Refreshing...');
    get_access_token(spotifyApi);
    next();
  } 

}




class Venue {
  constructor({name, location}){
    this.name = name;
    this.location = location;
    this.artists = [];
  }
  async addArtist(artist){
    this.artists.push(artist);
    await this.save();
  }
  async save(){
    const venue = new VenueModel({
      name: this.name,
      location: this.location,
      artists: this.artists
    });
    await venue.save();
  }
}

class Concert {
  constructor({artist, venue, location, date, status}){
    this.artist = artist;
    this.venue = venue;
    this.location = location;
    this.date = date;
    this.status = status;
    
  }
 
  async save(){
    const concert = new ConcertModel({
      artist: this.artist,
      venue: this.venue,
      location: this.location,
      date: this.date,
      status: this.status
    });
    await concert.save();
  }
}

/*
app.get('/', (req, res) => {
  console.log('here')
  console.log(mongoose.connection.readyState);

  const query = req.query;

  Object.keys(query).forEach(quer => {
    if(query[quer] ===''){
         delete query[quer];
    }
  });
  
  ConcertModel.find(query)
    .then((reviews) => {
      // You can get the count of the results directly from 'varToStoreResult.length'
      res.render('review', { class: reviews, count: res.locals.count });
    })
    .catch((err) => {
      console.error(err);
    });
    
   return 'hello'
});*/

app.get('/venues', (req, res) => {
  VenueModel.find()
    .then((venues) => {
      res.render('venue', {class: venues });
    })
    .catch((err) => {
      console.error(err);
    });
}
);

app.post('/venues/delete/:id', (req, res) => {
  const venueID = req.params.id;
  const objectId = new mongoose.Types.ObjectId(venueID);

  VenueModel.deleteOne({_id: objectId})
    .then(() => {
      res.redirect('/venues');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});



//render form to add new tasks
app.get('/concerts/add', (req, res) => {
  res.render('add', {count: res.locals.count});

});


app.post('/concerts/add', async (req, res) => {
  const concert = new Concert({
    artist : req.body.artist,
    venue: req.body.venue,
    location: req.body.location,
    date: req.body.date,
    status: req.body.status
  });
  

 
  
  try {
    // Check if the venue already exists in the database
    const existingVenue = await VenueModel.findOne({ name: req.body.venue });
    if (!existingVenue) {
      // If the venue doesn't exist, create a new entry
      const venue = new Venue({
        name: req.body.venue,
        location: req.body.location
    
      });
      await venue.addArtist(req.body.artist);
    
    } else {
      // If the venue already exists, add the artist to the list of artists
      const venueInstance = new Venue(existingVenue);
      await venueInstance.addArtist(req.body.artist);
    }

    await concert.save();
    res.redirect('/');

 
  } catch (err){
    res.status(500).send('Error adding concert');
    console.log(err);

  }

});


app.get('/concerts/edit/:id', (req, res) => {
  const concertId = req.params.id;
  
  // Assuming your Concert model is named 'Concert' and you're using findById
  ConcertModel.findById(concertId)
    .then((concert) => {
      if (!concert) {
        // Handle case where concert with provided ID is not found
        res.send('Concert not found');
        return;
      }
      
      res.render('edit', { concert }); // Render the 'edit' view with the fetched concert data
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});





app.post('/concerts/delete/:id', (req, res) => {
  const concertId = req.params.id;
  const objectId = new mongoose.Types.ObjectId(concertId);

  ConcertModel.deleteOne({_id: objectId})
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
  
});

app.post('/concerts/edit/:id', (req, res) => {
  const concertId = req.params.id;
  const objectId = new mongoose.Types.ObjectId(concertId);

  ConcertModel.updateOne({_id: objectId}, {
    artist : req.body.artist,
    venue: req.body.venue,
    location: req.body.location,
    date: req.body.date,
    status: req.body.status
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback'
});



router.get('/', (req,res)=> {
  res.redirect(spotifyApi.createAuthorizeURL([
    "ugc-image-upload",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "app-remote-control",
    "playlist-modify-public",
    "user-modify-playback-state",
    "playlist-modify-private",
    "user-follow-modify",
    "user-read-currently-playing",
    "user-follow-read",
    "user-library-modify",
    "user-read-playback-position",
    "playlist-read-private",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "playlist-read-collaborative",
    "streaming"
  ]));
});

router.get('/callback', (req,res)=> {
  console.log('reqquery', req.query);
  // const code = req.query.code;
  // console.log('code', code);
  // res.send(JSON.stringify(req.query));
  // get_access_token(res);
  // spotifyApi.setRefreshToken(req.query.code);
 //getMe();
  
  spotifyApi.authorizationCodeGrant(req.query.code).then((response) => {
    console.log(response.body)
    spotifyApi.setAccessToken(response.body['access_token']);
    getMe();
    res.send('success')
  });

});

// get_access_token(spotifyApi);

// checkResponse(spotifyApi);


const getMe = () => {
  console.log('calling get me')
  spotifyApi.getMe()
      .then(function (data) {
          console.log('Some information about the authenticated user', data.body);
      }, function (err) {
          console.log('Something went wrong! Get me', err);
          get_access_token(spotifyApi);
          getMe();
      });
};

//getMe();

app.use('/', router);

// app.listen(process.env.PORT || 3000);
app.listen(3000);

