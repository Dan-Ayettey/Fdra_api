const errorHandler=function (err,response){

    if(typeof (err) ==='string'){
        return  response.status(400).json({msg:'Not found'})
    }else if(err.name ==='UnauthorizedError'){
        return   response.status(401).json({msg:'Unauthorized'})
    } else
       return  response.status(500).json({msg:'server error'})



}

module.exports={
    errorHandler
}
