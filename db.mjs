// add your code here!
import mongoose from 'mongoose';
// Uncomment following line to debug value of database connectoin string

console.log(process.env.DSN);
console.log('trying to connect')
await mongoose.connect(process.env.DSN);
console.log('connected')

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
