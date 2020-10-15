//dependencies
const express = require('express');
const {authorize,admin}=require('../configurations/auth/authorize');
const {secret}=require('../configurations/auth/user-secret.json');
const {createUser,getUserById,
    getUsers,authorizeUser,
    deactivateUserById,
    activateUserById,
    updateUserById} = require("../controllers/userController");
const {apiVer } = require("../controllers/versionController");
const {withJWTAuthMiddleware}=require('express-kun');
const {schemaUpdate, schemaDelete,schemaCreate,schemaGet,schemaAuth} = require("../configurations/schema/userSchema");
const router = express.Router();



const protectedRouter=withJWTAuthMiddleware(router,secret);
/* Routers */

router.post('/v1/v1/managed_users',schemaCreate,authorize(admin),createUser);
router.patch('/v1/managed_users/:id',schemaGet,authorize(admin),getUsers);
protectedRouter.get('/v1/managed_users/',schemaGet,authorize(admin),getUsers);
protectedRouter.get('/v1/managed_users/:id',schemaGet,authorize(admin),getUsers);
protectedRouter.put('/v1/managed_users/:id',schemaGet,authorize(admin),activateUserById);
protectedRouter.delete('/v1/managed_users/:id',schemaGet,authorize(admin),getUsers);

router.post('/v1/users/auth',schemaAuth,authorizeUser);
router.post('/v1/users',schemaCreate,createUser);
protectedRouter.get('/v1/users/:id',schemaGet,getUserById);
protectedRouter.put('/v1/users/:id',schemaUpdate,updateUserById);
protectedRouter.put('/v1/users/:id/renewed_password',schemaGet,updateUserById);
protectedRouter.put('/v1/users/:id/deactivated_account',schemaUpdate,deactivateUserById);
router.get('/v1/',apiVer);
router.get('/',apiVer);
//router.get('/v1/users/:id',getUserById);


module.exports = router;
