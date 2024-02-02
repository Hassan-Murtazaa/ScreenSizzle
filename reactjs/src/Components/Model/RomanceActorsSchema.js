const moongose = require('mongoose');
const Schema = moongose.Schema;

const romance = new Schema({
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

const romanceActor = moongose.model('romanceActor', romance);

module.exports = romanceActor;