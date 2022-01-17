const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: { type: String, required: true, trim: true },
    img: { type: String, trim: true },
    characters: [{ type: Schema.Types.ObjectId, ref: "characters" }]
}, { timestamp: true }
)

const Game = mongoose.model('games', GameSchema)
module.exports = Game