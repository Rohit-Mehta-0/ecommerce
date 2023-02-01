const express = require("express");
const { createUser, loginUserControl, getallUser, getaUser, deletetaUser, updateUser, blockUser, unblockUser } = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();


router.post('/register',createUser);
router.post('/login',loginUserControl);
router.get('/allusers',getallUser);
router.get('/:id',authMiddleware, isAdmin, getaUser);
router.delete('/:id',deletetaUser);
router.put ('/edituser',authMiddleware,updateUser);
router.put ('/blockuser/:id',authMiddleware,isAdmin,blockUser);
router.put ('/unblockuser/:id',authMiddleware,isAdmin,unblockUser);






module.exports = router;