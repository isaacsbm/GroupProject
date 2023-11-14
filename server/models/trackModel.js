const mongoose = require('mongoose')

// genreEnum = ['Pop', 'Rock', '']
const TrackSchema = new mongoose.Schema({
    title: {
        type: String
    },
    track: {
        type: String
    },
    artist: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Track', TrackSchema);