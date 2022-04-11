const jwt = require('jsonwebtoken')

const SECRET="SECRET"
const generateJWT=(id)=>{
return jwt.sign({id}, SECRET, {
    expiresIn: "30d",
})
}

module.exports=generateJWT