const express = require('express');
const users = require("./userDb")
// const { validateUserId } = require("../middleware/user")

const router = express.Router();

router.post('/users',validateUser(), (req, res) => {
  // do your magic!
  users.insert(req.body)
 .then((user) => {
    res.status(201).json(user)
  })
  .catch((error) => {
   res.status(500).json({error: "error! couldn't add user to database"})
  })

});

router.post('users/:id/posts', validateUser(), validatePost(), (req, res) => {
  // do your magic!
  const post = {
    text: req.body.text,
    userID: req.params.id,
  };
  posts.insert(post)
  .then((comment) => {
    res.status(201).json(comment)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({error:"could not post"})
  })

});

router.get('/users', (req, res) => {
  // do your magic!
  users.get().then((user) => {
    res.status(200).json(user)
  });
});

router.get('/users/:id', validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user)

});

router.get('/users/:id/posts',validateUserId(), (req, res) => {
  // do your magic!
  // set req params id to ID and sub
  users.getUserPosts(req.params.id).then((posts) => {
    res.status(200).json(posts)
  })
});

router.delete('/users/:id',validateUserId(), (req, res) => {
  // do your magic!
  users.remove(req.params.id).then((user) => {
    res.status(200).json(user);
  })
});

router.put('users/:id',validateUser(), validateUserId(), (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body).then((newUser) => {
    res.status(201).json(newUser)
  });
});

//custom middleware

function validateUserId(req, res, next) {
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

function validateUser(req, res, next) {
return(req, res, next) => {
  if(!req.body) {
    return res.status(400).json({message: "missing user data"})
  
  }
  next()
}
}



function validatePost(req, res, next) {
  return(req, res, next) => {
    if(!req.body) {
      return res.status(400).json({message: "missing post data"})
    } else { (!req.body.text) 
      return res.status(400).json({message:"missing required text field",
    })
    }
    next()
  }
}
module.exports = router;
