const AuthService = require("../Services/auth.service");

function authenticationMiddleware(req, res, next){
    const header = req.headers.authorization

    if(!header || !header.startsWith('Bearer')) return next();
    const token = header.split(' ')[1];
    const userPayload = AuthService.decodeUserToken(token);

    if(userPayload) req.user = userPayload
    next();
}


// const AuthService = require("../Services/auth.service");

// function authenticationMiddleware(req, res, next) {
//     const header = req.headers.authorization;

//     if (!header || !header.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'Authorization header missing or malformed' });
//     }

//     const token = header.split(' ')[1];
//     const userPayload = AuthService.decodeUserToken(token);

//     if (!userPayload) {
//         return res.status(401).json({ error: 'Invalid or expired token' });
//     }

//     req.user = userPayload;
//     next();
// }




/**
 * @function restrictedToRole
 * @param {'admin' | 'user'} role
 */
function restrictedToRole(role){
    const roleAccessLevelMapping = {
        admin: 0,
        user: 9,
    }

    return function(req, res, next){
        const user = req.user;

        if(!user) return res.status(403).json({error: "You need to be logged in to get access of all this resource"});

        const roleAccessLevel = roleAccessLevelMapping[user.role]
        const requiredAccessLevel = roleAccessLevelMapping[role];

        if(roleAccessLevel > requiredAccessLevel) return res.status(403).json({error: 'Access Denied'});

        next();

    }
}

module.exports = {
    authenticationMiddleware,
    restrictedToRole,
}