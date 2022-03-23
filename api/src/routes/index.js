const router = require("express").Router();

//Middlewares
const auth = require('../middlewares/auth')

// Controllers
const AuthController = require('../controllers/AuthController')

// Importe de todas las rutas:
const { getGenres } = require("./Genres/getGenres");
const { postGenre } = require("./Genres/postGenre");
const { deleteGenre } = require("./Genres/deleteGenre");
const { putGenre } = require("./Genres/putGenre");

const { getCharacters } = require("./Characters/getCharacters");
const { deleteCharacter } = require("./Characters/deleteCharacter");
const { postCharacter } = require("./Characters/postCharacter");
const { putCharacter } = require("./Characters/putCharacter");

const { getMovies } = require("./Movies/getMovies");
const { deleteMovie } = require("./Movies/deleteMovie");
const { postMovie } = require("./Movies/postMovie");
const { putMovie } = require("./Movies/putMovie");
/*          Configuracion de rutas:        */

// Reviews:
router.get("/genres", auth, getGenres)
router.post("/genres", auth, postGenre)
router.delete("/genres/:idGenre", auth, deleteGenre)
router.put("/genres/:idGenre", auth, putGenre)

router.post("/auth/login", AuthController.signIn)
router.post("/auth/register", AuthController.signUp)

router.get("/characters", getCharacters)
router.get("/characters/:idCharacter", getCharacters)
router.post("/characters", postCharacter)
router.delete("/characters/:idCharacter", deleteCharacter)
router.put("/characters/:idCharacter", putCharacter)

router.get("/movies", getMovies)
router.get("/movies/:idMovie", getMovies)
router.post("/movies", postMovie)
router.delete("/movies/:idMovie", deleteMovie)
router.put("/movies/:idMovie", putMovie)

module.exports = router;