import './config.mjs';
import express from 'express';
const app = express();
import './db.mjs';
import mongoose from 'mongoose';
const Concert = mongoose.model('Concert');
const User = mongoose.model('User');
import url from 'url';
import path from 'path';
import session from 'express-session';
import crypto from 'crypto';


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('view engine', 'hbs');
const sessionOptions = { 
	secret: crypto.randomBytes(32).toString('hex'), 
	saveUninitialized: false, 
	resave: false
};

app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: false }));


app.use(function(req,res,next) {
  if(req.session.count === undefined){
      req.session.count = 0;
  }
  if(req.session.review === undefined){
    req.session.review = [];
  } 
  console.log(req.session.count , req.method);
  req.session.count++;
  res.locals.count = req.session.count;

  next();
});

app.get('/', (req, res) => {
  const query = req.query;

  Object.keys(query).forEach(quer => {
    if(query[quer] ===''){
         delete query[quer];
    }
  });

Review.find(query)
  .then((reviews) => {
    // You can get the count of the results directly from 'varToStoreResult.length'
    res.render('review', { class: reviews, count: res.locals.count });
  })
  .catch((err) => {
    console.error(err);
  });

});
//render form to add new tasks
app.get('/reviews/add', (req, res) => {
  res.render('add', {count: res.locals.count});

});


app.post('/reviews/add', (req, res) => {
  const rev = new Review({
    courseNumber: req.body.courseNumber,
    courseName: req.body.courseName,
    semester: req.body.semester,
    year: req.body.year,
    professor: req.body.professor,
    review: req.body.review

  });

  req.session.review.push(rev);
  req.session.count -=1;

  rev.save() 
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.error(err);
    });
  


});

app.get('/reviews/mine', (req, res) => {
  const myReviews = req.session.review;
  res.render('mine', {class: myReviews , count: res.locals.count});
});


app.listen(process.env.PORT || 3000);

