// add your code here!
import mongoose from 'mongoose';
// Uncomment following line to debug value of database connectoin string
console.log(process.env.DSN);
mongoose.connect(process.env.DSN);


//Concert Schema

const Concert = new mongoose.Schema({
    concertID: Number,
    artist: String,
    venue: String,
    location: String,
    date: Date,
    status: String

});

const User = new mongoose.Schema({
    username: String,
    password: String,
    concerts: Array
});

mongoose.model('Concert', Concert);
mongoose.model('User', User);
