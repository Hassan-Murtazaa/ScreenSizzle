const moongose = require('mongoose');
const Schema = moongose.Schema;

const romance = new Schema({
    picture: {
        type: String,
        required: true
    },

    name: {
        type: String,
        require: true
    },

    about: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    card_picture: {
        type: String,
        required: true
    },

    IMDB: {
        type: String,
        required: true
    }
}, { timestamps: true });

const romancePage = moongose.model('romancePage', romance);

module.exports = romancePage;