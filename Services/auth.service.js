const JWT = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('../models/user.model')
const {hash} = require('../utils/hash');
const AppError = require('../errors/app.error');


const JWT_SECRET = process.env.JWT_SECRET;

    if(!JWT_SECRET || JWT_SECRET ===''){
        throw new Error('JWT SECRET is missing')
    }


class AuthService {

    
    /**
     * @function generateUserToken
     * @param {{_id: string, role:'admin'|'user' }} payload 
     * @returns { String} JWT signed token
     */
    static generateUserToken(payload){
        const token = JWT.sign(payload, JWT_SECRET)
        return token;
    }


    /**
     * @function signupWithEmailAndPassword
     * @param { {firstname: String, lastname?:String, email:String, password:String}} data 
     * @returns { { Promise<string> }} JWT signed token
     */
    static async signupWithEmailAndPassword(data){
        const {firstname, lastname, email, password} = data

        const salt = crypto.randomBytes(26).toString('hex');
        const hashedPassword=hash(password, salt);


        try{
            const user =await  User.create({
                firstname, 
                lastname, 
                email, 
                salt, 
                password : hashedPassword
            })

            const token = AuthService.generateUserToken({
                _id:user, role: user.role
            })

            return token;
        }catch(err){
            console.log(`Error Creating the error`, err)
            throw err;
        }
    }

    /**
     * @function signInWithEmailAndPassword
     * @param { {email:String, password:String}} data 
     * @returns { { Promise<string> }} JWT signed token
     */
    static  async signInWithEmailAndPassword(data){
        const {email, password} = data

        const user = await User.findOne({email})

        if(!user) throw new AppError(`User with email ${email} does not exist`)
        
        const hashedPassword = hash(password, user.salt);

        if(hashedPassword !== user.password) throw new AppError(`Invalid EmailId or password`)

        const token = AuthService.generateUserToken({
            _id : user._id,
            role: user.role
        })

        return token;
    }

    /**
     * 
     * @param {string} token 
     * @returns { { _id: string; role: 'admin' | 'user' }}
     */
    static  decodeUserToken(token){
        try{
            const payload = JWT.verify(token, JWT_SECRET);
            return payload;
        }catch(err){    
            return false;
        }
    }
}

module.exports = AuthService