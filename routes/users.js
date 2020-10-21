//dependencies
const express = require('express');
const {grantAccess,allowIfLoggedIn}=require('../configurations/auth/grantAccess');
const {secret}=require('../configurations/auth/user-secret.json');
const {createUser,getUserById,getUsers,authorizeUser, deactivateUserById, activateUser, updateUserById,deleteUserById,
    renewPasswordById,veryToken}= require("../controllers/userController");
const {apiVer } = require("../controllers/versionController");
const {withJWTAuthMiddleware}=require('express-kun');
const {schemaUpdate,schemaRenewPassword,schemaCreate,schemaGet,schemaAuth,schemaActivate} = require("../configurations/schema/userSchema");
const router = express.Router();
const protectedRouter=withJWTAuthMiddleware(router,secret);

/* RoutersBasic role */
router.post('/v1/users',schemaCreate,createUser);
router.post('/v1/users/auth',schemaAuth,authorizeUser);
router.use(veryToken);
router.post('/v1/users/activated_account',schemaActivate,activateUser);
protectedRouter.get('/v1/users/:id',[schemaGet,allowIfLoggedIn],getUserById);
protectedRouter.put('/v1/users/:id',[schemaUpdate,allowIfLoggedIn],updateUserById);
protectedRouter.put('/v1/users/:id/renewed_password',[schemaRenewPassword,allowIfLoggedIn],renewPasswordById);
protectedRouter.put('/v1/users/:id/deactivated_account',[schemaUpdate,allowIfLoggedIn],deactivateUserById);

//Administrator role
protectedRouter.get('/v1/admins/managed_users/',allowIfLoggedIn,grantAccess('readAny','profile'),getUsers);
protectedRouter.delete('/v1/admins/managed_users/:id',schemaGet,allowIfLoggedIn,grantAccess('deleteAny','profile'),deleteUserById);

router.get('/v1/',apiVer);
router.get('/',apiVer);
module.exports = router;
