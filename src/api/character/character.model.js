const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        img: { type: String, trim: true },
        weight: { type: String, trim: true},
        height: { type: String, trim: true},
        gender: { type: String, trim: true},
        race: { type: String, trim: true}

    },
    {
        timestamps: true
    }
);

const Character = mongoose.model('characters', characterSchema)
module.exports = Character