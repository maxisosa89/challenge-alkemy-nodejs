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


/*          Configuracion de rutas:        */

// Reviews:
router.get("/genres", auth, getGenres)
router.post("/genres", auth, postGenre)
router.delete("/genres/:idGenre", auth, deleteGenre)
router.put("/genres/:idGenre", auth, putGenre)
router.post("/signin", AuthController.signIn)
router.post("/signup", AuthController.signUp)


module.exports = router;