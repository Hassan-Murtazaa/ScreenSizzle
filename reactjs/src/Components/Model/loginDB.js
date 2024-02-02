const moongose = require('mongoose');
const Schema = moongose.Schema;

const movieCinema = new Schema({
    username:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    }

});

const LoginSignUp = moongose.model('LoginSignUp',movieCinema);

module.exports = LoginSignUp;

