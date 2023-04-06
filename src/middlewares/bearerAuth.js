'use strict';
const {users} = require("../models/index");
async function bearer(req, res, next) {
    if (req.headers.authorization) {

        const bearerToken = req.headers.authorization.split(" ")[1];
        users.authenticateBearer(bearerToken)
            .then((userData) => {
                req.user = userData;
                next();
            })
            .catch(() => {
                next("Invalid Token");
            })
    }
}

module.exports = bearer;