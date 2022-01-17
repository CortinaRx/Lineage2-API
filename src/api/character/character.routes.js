const CharacterRoutes = require('express').Router()
const { isAdmin } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewCharacter, getAllCharacters, getCharacter, patchCharacter, deleteCharacter } = require('./character.controller')

//Las personas interesadas a ver esta API podran atacar en el caso todos los characters que hay de este juego, tambien obtener cualquier character en particular, solo promocionando el ID que interese al ver todos los characters.
//Solo personas autorizadas podran CREAR, CAMBIAR, o BORRAR characters, en caso de necesitarse.
CharacterRoutes.get('/', getAllCharacters)
CharacterRoutes.get('/:id', getCharacter)
CharacterRoutes.post('/', [isAdmin], upload.single('img'), postNewCharacter)
CharacterRoutes.patch('/:id', [isAdmin], upload.single('img'), patchCharacter)
CharacterRoutes.delete('/:id', [isAdmin], upload.single('img'), deleteCharacter)

module.exports = CharacterRoutes