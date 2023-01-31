const express = require("express");
const { createUser, loginUserControl, getallUser, getaUser, deletetaUser, updateUser } = require("../controller/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();


router.post('/register',createUser);
router.post('/login',loginUserControl);
router.get('/allusers',getallUser);
router.get('/:id',authMiddleware,getaUser);
router.delete('/:id',deletetaUser);
router.put ('/:id',updateUser);





module.exports = router;