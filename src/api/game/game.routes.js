const GameRoutes = require('express').Router()
const { isAdmin} = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewGame, getAllGames, getGame, patchGame, deleteGame } = require('./game.controller')

//De momento nuestra API es de Lineage2, quizas en un futuro agregaremos nuevos juegos RPG, por lo cual, dejaremos nuestra ruta de GetAllGames,
// ya que probablemente pueda cambiar esto, de momento se vera solo Lineage2.
GameRoutes.get('/', getAllGames)
GameRoutes.get('/:id', getGame)
GameRoutes.post('/', [isAdmin], upload.single('img'), postNewGame)
GameRoutes.patch('/:id', [isAdmin], upload.single('img'), patchGame)
GameRoutes.delete('/:id', [isAdmin], upload.single('img'), deleteGame)

module.exports = GameRoutes