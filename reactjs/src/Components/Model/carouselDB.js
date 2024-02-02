const moongose = require('mongoose');
const Schema = moongose.Schema;

const movieCinema = new Schema({
    title:{
        type:String,
        require:true
    },
    snippet:{
        type:String,
        required:true
    },

    picture: {
        type:String,
        required:true
    }

},{timestamps:true});

const Movie = moongose.model('CarouselGallery',movieCinema);

module.exports = Movie;

