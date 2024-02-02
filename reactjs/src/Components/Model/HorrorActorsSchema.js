const moongose = require('mongoose');
const Schema = moongose.Schema;

const horror = new Schema({
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

const horrorActor = moongose.model('horrorActor', horror);

module.exports = horrorActor;