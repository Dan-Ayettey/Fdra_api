//dependencies
const express = require('express');
const {getCustomerById} = require("../controllers/userController");
const {grantAccess,allowIfLoggedIn}=require('../configurations/auth/grantAccess');
const {createUser,getUserById,getUsers,authorizeUser, deactivateUserById, activateUser, updateUserById,deleteUserById,
    renewPasswordById,veryToken,renewSecretById}= require("../controllers/userController");
const {apiVer } = require("../controllers/versionController");
const {deleteCartProductById,createCartProduct,getCartProducts,
    getCartProductById,updateCartProductById,getCartProductsByUserId}=require('../controllers/cartController');
const {getCartSchema,createCartSchema,updateCartSchema,getCartByIdSchema,getCartProductsByUserIdSchema}=require('../configurations/schema/cartSchema');
const {withJWTAuthMiddleware}=require('express-kun');
const {schemaUpdate,getCustomerByIdSchema,schemaRenewPassword,schemaCreate,schemaGet,schemaAuth,schemaActivate,schemaDelete,schemaRenewSecretMessage}
= require("../configurations/schema/userSchema");
const router = express.Router();
const protectedRouter=withJWTAuthMiddleware(router,process.env.JWT_SECRET);

/* RoutersBasic role */
router.get('/v1/',apiVer);
router.all('/',apiVer);
router.post('/v1/users',schemaCreate,createUser);
//router.post('/v1/payments',createStripeChargeIntent);
router.post('/v1/users/auth',schemaAuth,authorizeUser);
router.use(schemaGet,veryToken);

router.post('/v1/users/activated-accounts',schemaActivate,activateUser);
protectedRouter.get('/v1/users/:id',schemaGet,allowIfLoggedIn,getUserById);
protectedRouter.put('/v1/users/:id',schemaUpdate,allowIfLoggedIn,updateUserById);
protectedRouter.put('/v1/users/:id/renewed-secret',schemaRenewSecretMessage,allowIfLoggedIn,renewSecretById);
protectedRouter.put('/v1/users/:id/renewed-password',schemaRenewPassword,renewPasswordById);
protectedRouter.put('/v1/users/:id/deactivated-account',schemaUpdate,allowIfLoggedIn,deactivateUserById);

//cart routes
router.post('/v1/carts/users/:id',createCartSchema,createCartProduct);
protectedRouter.delete('/v1/carts/managed-user/:id',getCartSchema,allowIfLoggedIn,deleteCartProductById);
protectedRouter.get('/v1/carts/:id',getCartByIdSchema,allowIfLoggedIn,getCartProductById);
protectedRouter.put('/v1/carts/managed-user/:id',updateCartSchema,allowIfLoggedIn,updateCartProductById);
protectedRouter.get('/v1/carts/users/:id',getCartProductsByUserIdSchema,allowIfLoggedIn,getCartProductsByUserId);

//Customer routes
protectedRouter.get('/v1/customers/:id',getCustomerByIdSchema,allowIfLoggedIn,getCustomerById);
//Administrator role
protectedRouter.get('/v1/admins/managed-carts/',getCartProductsByUserIdSchema,allowIfLoggedIn,grantAccess('readAny','profile'),getCartProducts);
protectedRouter.get('/v1/admins/managed-users/',allowIfLoggedIn,grantAccess('readAny','profile'),getUsers);
protectedRouter.get('/v1/admins/managed-user/:id',schemaGet,allowIfLoggedIn,grantAccess('readAny','profile'),getUserById);
protectedRouter.delete('/v1/admins/managed-user/:id',schemaDelete,allowIfLoggedIn,grantAccess('deleteAny','profile'),deleteUserById);
protectedRouter.put('/v1/admins/managed-user/:id',schemaDelete,allowIfLoggedIn,grantAccess('updateAny','profile'),deleteUserById);
protectedRouter.delete('/v1/admins/managed-cart/:id',getCartSchema,allowIfLoggedIn,grantAccess('deleteAny','profile'),deleteCartProductById);



module.exports = router;
