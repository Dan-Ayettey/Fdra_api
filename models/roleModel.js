const {AccessControl} = require("accesscontrol");
const access = new AccessControl();
//Role model
const roleModel = (function() {
    access.grant("basic")
        .readOwn("profile")
        .updateOwn("profile");

    access.grant("supervisor")
        .extend("basic")
        .readAny("profile");

    access.grant("admin")
        .extend("basic")
        .extend("supervisor")
        .updateAny("profile")
        .deleteAny("profile");

    return access;
})();
module.exports={
    roles: roleModel
};
