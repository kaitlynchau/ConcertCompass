import './config.mjs';
import express, { response } from 'express';
const app = express();
import './db.mjs';
import mongoose from 'mongoose';
const Concert = mongoose.model('Concert');
const User = mongoose.model('User');

import url from 'url';
import path from 'path';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
const router = express.Router();


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('view engine', 'hbs');


// app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: false }));




app.get('/', (req, res) => {
  const query = req.query;

  Object.keys(query).forEach(quer => {
    if(query[quer] ===''){
         delete query[quer];
    }
  });

  Concert.find(query)
    .then((reviews) => {
      // You can get the count of the results directly from 'varToStoreResult.length'
      res.render('review', { class: reviews, count: res.locals.count });
    })
    .catch((err) => {
      console.error(err);
    });

});




//render form to add new tasks
app.get('/concerts/add', (req, res) => {
  res.render('add', {count: res.locals.count});

});


app.post('/concerts/add', (req, res) => {
  const concert = new Concert({
    artist : req.body.artist,
    venue: req.body.venue,
    location: req.body.location,
    date: req.body.date,
    status: req.body.status
  });


  concert.save() 
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.error(err);
    });

});

app.get('/concerts/edit/:id', (req, res) => {
  const concertId = req.params.id;
  
  // Assuming your Concert model is named 'Concert' and you're using findById
  Concert.findById(concertId)
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

  Concert.deleteOne({_id: objectId})
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

  Concert.updateOne({_id: objectId}, {
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



let token =process.env.SPOTIFY_TOKEN;

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback'
});

router.get('/', (req,res,next)=> {
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

router.get('/callback', (req,res,next)=> {
  console.log('reqquery', req.query);
  const code=  req.query.code
  // console.log('code', code);
  // res.send(JSON.stringify(req.query));
  spotifyApi.authorizationCodeGrant(req.query.code).then((response) => {
    res.send(JSON.stringify(response))
    
    
    
  })

})
spotifyApi.setAccessToken(token);


const getMe = () => {
  spotifyApi.getMe()
      .then(function (data) {
          console.log('Some information about the authenticated user', data.body);
      }, function (err) {
          // console.log('token',token);

          console.log('Something went wrong!', err);
      });
}

getMe();

app.use('/', router);



app.listen(process.env.PORT || 3000);
// app.listen(3000);

