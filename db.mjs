// add your code here!
import mongoose from 'mongoose';
// Uncomment following line to debug value of database connectoin string
console.log(process.env.DSN);
mongoose.connect(process.env.DSN);



//Concert Schema

const Concert = new mongoose.Schema({
    artist: String,
    venue: String,
    location: String,
    date: Date,
    status: String

});


const Venue = new mongoose.Schema( {
    name: String,
    location: String,
    artists: [String]
});


mongoose.model('Concert', Concert);

mongoose.model('Venue', Venue);
