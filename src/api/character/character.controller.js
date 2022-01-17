const Character = require('./character.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewCharacter = async (req, res, next) => {
    try {
        const newCharacter = new Character()
        newCharacter.name = req.body.name
        newCharacter.weight = req.body.weight
        newCharacter.height = req.body.height
        newCharacter.gender = req.body.gender
        newCharacter.race = req.body.race
        if (req.file) {
            newCharacter.img = req.file.path
        }
        const characterDB = await newCharacter.save()
        return res.status(201).json(characterDB)
    } catch (error) {
        return next(setError(500, 'Character not saved'))
    }
}

const getAllCharacters = async (req, res, next) => {
    try {
        const charactersDB = await Character.find()
        res.status(200).json(charactersDB)
    } catch (error) {
        return next(setError(500, 'Character failed server'))
    }
}

const getCharacter = async (req, res, next) => {
    try {
        const { id } = req.params
        const characterDB = await Character.findById(id)
        if (!characterDB) {
            return next(setError(404, 'Character not found'))
        }
        return res.status(200).json(characterDB)
    } catch (error) {
        return next(setError(500, 'Character server error'))
    }
}

const patchCharacter = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchCharacter = new Character(req.body)
        patchCharacter._id = id
        if (req.file) {
            patchCharacter.img = req.file.path
        }
        const characterDB = await Character.findByIdAndUpdate(id, patchCharacter)
        if (!characterDB) {
            return next(setError(404, 'Character not found'))
        }
        if (characterDB.img) deleteFile(characterDB.img)
        return res.status(200).json({ new: patchCharacter, old: characterDB })
    } catch (error) {
        return next(setError(500, 'Character Patch server error'))
    }
}

const deleteCharacter = async (req, res, next) => {
    try {
        const { id } = req.params
        const characterDB = await Character.findByIdAndDelete(id)
        if (!characterDB) {
            return next(setError(404, 'Character not found'))
        }
        if (characterDB.img) deleteFile(characterDB.img)
        return res.status(200).json(characterDB)
    } catch (error) {
        return next(setError(500, 'Character removed server error'))
    }
}

module.exports = {
    postNewCharacter,
    getAllCharacters,
    getCharacter,
    patchCharacter,
    deleteCharacter
}
