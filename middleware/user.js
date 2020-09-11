const users = require("../users/userDb")

function validateUserId() {
    return(req, res, next) => {
        users.getById(req.params.id)
        .then((user) => {
            if(user){
                req.user = user
                next()
            } else {
                res.status(400).json({message: "Invalid user ID",
            })
            }
        }) 
        .catch(next)
    }
}