const moongose = require('mongoose');
const Schema = moongose.Schema;

const comedy = new Schema({
    movieName: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    actorName: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
}, { timestamps: true });

const comedyActor = moongose.model('comedyActor', comedy);

module.exports = comedyActor;