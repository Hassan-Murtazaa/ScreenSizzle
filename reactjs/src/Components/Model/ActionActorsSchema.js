const moongose = require('mongoose');
const Schema = moongose.Schema;

const action = new Schema({
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

const actionActor = moongose.model('actionActor', action);

module.exports = actionActor;