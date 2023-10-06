const jwt = require('jsonwebtoken')
const SECRET_KEY = "4715aed3c946f7b0lokoa38e6b534astan958362x8d84e96d10fbc04700770d572af3dce43625dd"

exports.authUSer = async (req, res, next) => {
   try {
      let token = req.headers.authorization
      if (token) {
         token = token.slice(7, token.length)
         jwt.verify(token,SECRET_KEY, (err, decodedToken) => {
         if(err) {
            // console.log(token);
            return res.status(403).json(token)
         }
         else{
            if(decodedToken.roles.includes("user")) {
               req.params.userId = decodedToken.id
               next()
            }else {
               res.status(403).json("You are not authorize to access")
            }
            // req.user = decodedToken;
         }
         })
      } else {
         res.status(403).json("Invalid Token")
      }
   } catch (error) {
      res.status(403).json("You are not authorize to access")
   }
}

exports.authOrganisator = async (req, res, next) => {
   try {
      let token = req.headers.authorization
      if (token) {
         token = token.slice(7, token.length)
         jwt.verify(token,SECRET_KEY, (err, decodedToken) => {
         if(err) {
            // console.log(token);
            return res.status(403).json(token)
         }
         else{
            if(decodedToken.roles.includes("organisator")) {
               req.params.orgid = decodedToken.id
               next()
            }else {
               res.status(403).json("You are not authorize to access")
            }
            // req.user = decodedToken;
         }
         })
      } else {
         res.status(403).json("Invalid Token")
      }
   } catch (error) {
      res.status(403).json("You are not authorize to access. Invalid credentials!")
   }
}

exports.authAdmin = async (req, res, next) => {
   try {
      let token = req.headers.authorization
      if (token) {
         token = token.slice(7, token.length)
         jwt.verify(token,SECRET_KEY, (err, decodedToken) => {
         if(err) {
            // console.log(token);
            return res.status(403).json(token)
         }
         else{
            if(decodedToken.roles.includes("admin")) {
               next()
            }else {
               res.status(403).json("You are not authorize to access")
            }
            // req.user = decodedToken;
         }
         })
      } else {
         res.status(403).json("Invalid Token")
      }
   } catch (error) {
      res.status(403).json("You are not authorize to access")
   }
}