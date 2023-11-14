const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectId;
const multer = require('multer')
const { Readable} = require('stream')
const fs = require('fs')
const Track = require('../models/trackModel')


module.exports = {
    streamAudio: (req, res) => {
        const trackId = new ObjectID(req.params.id);

        Track.findById(trackId)
            .select('track')
            .lean() //asks backend
            .exec() //query
            .then(track => {
                if (!track || !track.track) {
                    return res.status(404).json({ error: 'No track found' });
                }
                const trackPath = track.track;

                console.log('Track path:', track.track);

                // Check if the file exists
                if (!fs.existsSync(trackPath)) {
                    return res.status(404).json({ error: 'Track file not found' });
                }

                res.set({
                    'Content-Type': 'audio/mp3',
                    'Accept-Ranges': 'bytes',
                });
                const stream = fs.createReadStream(trackPath);
                stream.pipe(res);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            });
    },
    uploadTrack: (req, res) => {
        if(!req.file){
            return res.status(400).json({msg: 'No track uploaded'})
        }
        Track.create({
            title: req.body.title,
            track: req.file.path,
            artist: req.body.artist
        })
            .then(newTrack => {
                console.log("Track was sucessfully uploaded")
                res.json(newTrack)
            })
            .catch(err =>{
                res.status(400).json(err)
            })
    },
    findAllTracks: (req, res) => {
        Track.find()
        .then(allTracks => {
            // console.log("all tracks grabbed")
            res.json(allTracks)
        })
        .catch(err => res.status(400).json(err))
    },
    findOneTrack: (req, res) => {
        Track.findById(req.params.id)
        .then(oneTrack => {
            
            res.json(oneTrack)
        })
        .catch(err => res.status(400).json(err))
    },
    updateTrack: (req, res) => {
        const newTrack = req.file;
        Track.findById(req.params.id)
            .then(track => {
                if(!track){
                    return res.status(404).json({error: 'Track not found!'})
                }
                if(newTrack){
                    //check if an old track exists and delete it
                    if(track.track){
                        fs.unlinkSync(track.track)
                    }
                    track.track = newTrack.path;
                }

                track.title = req.body.title;
                track.artist = req.body.artist

                track.save()
                    .then(updatedTrack => {
                        console.log('Track was updated!')
                        res.json(updatedTrack)
                    })
                    .catch(err => res.status(400).json(err));
            })
        .catch(err => res.status(400).json(err));

    },
    deleteTrack: (req, res) => {
        Track.findById(req.params.id)
            .then(track => {
                if(!track){
                    return res.status(404).json({error: 'Track not found!'})
                }
                if(track.track){
                    fs.unlinkSync(track.track);
                }
            Track.findByIdAndDelete(req.params.id)
                .then(() => {
                    res.json({deleted: true})
                })
                .catch(err => res.status(400).json(err))
            })
        .catch(err => res.status(400).json(err));
    }
}