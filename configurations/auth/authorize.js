const jwt=require('express-jwt');
const {secret}=require('./user-secret.json')
//Set constructs or composites
const authorize=function(roles=[]){
    if(typeof roles === 'string') {
        roles=[roles];
    }
    return [
        jwt({secret,algorithms:['H256']}),
        (request,response,next)=>{

            if(roles.length>0 && roles.includes('user')){
                return response.status('404').json({msg:'Unauthorized'});

            }
            next();
        }
    ];


};
module.exports={
    authorize,
    user:'user',
    admin:'admin'
}
