import './config.mjs';
import express from 'express';
const app = express();
import './db.mjs';
import mongoose from 'mongoose';
const Concert = mongoose.model('Concert');
//const User = mongoose.model('User');
import url from 'url';
import path from 'path';



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


app.listen(process.env.PORT || 3000);

