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
router.get("/genres",  getGenres)
router.post("/genres", postGenre)
router.delete("/genres/:idGenre", deleteGenre)
router.put("/genres/:idGenre", putGenre)
router.post("/signIn", AuthController.signIn)
router.post("/signUp", AuthController.signUp)


module.exports = router;