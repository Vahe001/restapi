const User = require('./../models/users');

class middleware {
    static _auth(permission) {
        return async function (req, res, next) {
            const users = await User
                .query()
                .skipUndefined()
                .where('id', 'like', req.params.id)
                if(users[0].role == permission){
                    return next();
                }
                else
                 return res.send("permission denied")
            }

        }
    }

module.exports = middleware;
