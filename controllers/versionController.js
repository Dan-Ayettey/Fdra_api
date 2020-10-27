const version=require('../models/versionModel');

//version route
const apiVer=async function (request,response){

        const versioning={
            "api_name": version.getApiNameSpace("localhost:3000"),
            "api_version": version.getApiVersion("1"),
            "api_released": version.getApiReleasedDate("2020-10-10"),
            "api_documentation": version.getApiDocLink("https://v1.web.app/sprint/v1/docs"),
            "api_status": version.getApiStatus('isActive')
        };
        response.status(200).json(versioning);



};
module.exports={apiVer};
