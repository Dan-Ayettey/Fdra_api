/*
  constructs : getApiVersion, getApiNameSpace, getApiReleasedDate,
  getApiDocLink, getApiStatus
 */

const getApiVersion=function (version){
    return version;
};
const getApiNameSpace=function (nameSpace){
    return  nameSpace;
};
const getApiReleasedDate=function (date){
    return  date;
};
const getApiDocLink=function (link){
    return  link;
};
const getApiStatus=function (status){
    return  status;
};

//modules
module.exports={
    getApiVersion,
    getApiDocLink,
    getApiNameSpace,
    getApiReleasedDate,
    getApiStatus

};



