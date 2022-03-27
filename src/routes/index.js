const router = require("express").Router();

//Middlewares
const auth = require('../middlewares/auth')

// Controllers
const AuthController = require('../controllers/AuthControllers')
const GenreController = require('../controllers/GenreControllers')
const CharacterController = require('../controllers/CharacterControllers')
const MovieController = require('../controllers/MovieControllers')

/*          Configuracion de rutas:        */

router.post("/auth/login", AuthController.login)
router.post("/auth/register", AuthController.register)

router.get("/genres", auth, GenreController.getGenres)
router.get("/genres/:idGenre", auth, GenreController.getGenres)
router.post("/genres", auth, GenreController.postGenre)
router.delete("/genres/:idGenre", auth, GenreController.deleteGenre)
router.put("/genres/:idGenre", auth, GenreController. putGenre)

router.get("/characters", auth, CharacterController.getCharacters)
router.get("/characters/:idCharacter", auth, CharacterController.getCharacters)
router.post("/characters", auth, CharacterController.postCharacter)
router.delete("/characters/:idCharacter", auth, CharacterController.deleteCharacter)
router.put("/characters/:idCharacter", auth, CharacterController.putCharacter)

router.get("/movies", auth, MovieController.getMovies)
router.get("/movies/:idMovie", auth, MovieController.getMovies)
router.post("/movies", auth, MovieController.postMovies)
router.delete("/movies/:idMovie", auth, MovieController.deleteMovies)
router.put("/movies/:idMovie", auth, MovieController.putMovies)

module.exports = router;