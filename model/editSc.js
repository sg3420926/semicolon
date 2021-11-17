const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const picSc = new Schema({
    name: {
        type: String,
    }, 

    email: {
        type: String
    },

    pic: {
        type: String
    },
    pos: {
        type: String
    },

});


const pic=mongoose.model('Pic',picSc)
module.exports = pic;