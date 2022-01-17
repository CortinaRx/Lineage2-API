const Game = require('./game.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewGame = async (req, res, next) => {
    try {
        const newGame = new Game()
        newGame.name = req.body.name
        newGame.characters = req.body.characters
        if (req.file) {
            newGame.img = req.file.path
        }
        const gameDB = await newGame.save()
        return res.status(201).json(gameDB)
    } catch (error) {
        return next(setError(500, 'Game not saved'))
    }
}
//LO tendremos presente por si en un futuro queremos agregar nuevo juego, pero en principio sera solo de Lineage2
const getAllGames = async (req, res, next) => {
    try {
        const gamesDB = await Game.find().populate('characters')
        res.status(200).json(gamesDB)
    } catch (error) {
        return next(setError(500, 'Game failed server'))
    }
}
//Para el caso que tengamos varios games, lo buscaremos por ID
const getGame = async (req, res, next) => {
    try {
        const { id } = req.params
        const gameDB = await Game.findById(id).populate('characters')
        if (!gameDB) {
            return next(setError(404, 'Game not found'))
        }
        return res.status(200).json(gameDB)
    } catch (error) {
        return next(setError(500, 'Game server error'))
    }
}
//Por si tuviesemos varios juegos, en principio es de Lineage 2
const patchGame = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchGame = new Game(req.body)
        patchGame._id = id
        if (req.file) {
            patchGame.img = req.file.path
        }
        const gameDB = await Game.findByIdAndUpdate(id, patchGame)
        if (!gameDB) {
            return next(setError(404, 'Game not found'))
        }
        if (gameDB.img) deleteFile(gameDB.img)
        return res.status(200).json({ new: patchGame, old: gameDB })
    } catch (error) {
        return next(setError(500, 'Game Patch server error'))
    }
}

const deleteGame = async (req, res, next) => {
    try {
        const { id } = req.params
        const gameDB = await Game.findByIdAndDelete(id)
        if (!gameDB) {
            return next(setError(404, 'Game not found'))
        }
        if (gameDB.img) deleteFile(gameDB.img)
        return res.status(200).json(gameDB)
    } catch (error) {
        return next(setError(500, 'Game removed server error'))
    }
}

module.exports = {
    postNewGame,
    getAllGames,
    getGame,
    patchGame,
    deleteGame
}
