const AppError = require('../errors/app.error');
const { userSignUpValidationSchema, userSignInValidationSchema} = require('../lib/validators/auth.validators')
const AuthService = require('../Services/auth.service')


async function handleSignup(req, res){
    const validationresult = await userSignUpValidationSchema.safeParseAsync(req.body);

    if(validationresult.error){
        return res.status(400).json({error: validationresult.error})
    }

    const { firstname, lastname, email, password } = validationresult.data
    try{
        const token = await AuthService.signupWithEmailAndPassword({
            firstname,
            lastname,
            email,
            password,
        })
        return res.status(200).json({status: 'success', data: {token}});
    }catch(err){
        if(err instanceof AppError){
            return res.status(err.code).json({status: 'error', message: err.message});
        }
        console.log('`Error', err)
        return res.status(500).json({status: 'error', message: 'Internal server error'});
    }
}

async function handleSignin(req, res){
    const validationresult = await userSignInValidationSchema.safeParseAsync(req.body);

    if(validationresult.error){
        return res.status(400).json({error: validationresult.error})
    }

    const { email, password } = validationresult.data
    try{
        const token = await AuthService.signInWithEmailAndPassword({
            email,
            password,
        })
        return res.status(200).json({status: 'success', data: {token}});

    }catch(err){
        if(err instanceof AppError){
            return res.status(err.code).json({status: 'error', message: err.message});
        }
        console.log('`Error', err)
        return res.status(500).json({status: 'error', message: 'Internal server error'});
    }
}

async function handleMe(req, res){
    if(!req.user) return res.json({isLoggedIn: false})
    return res.json({isLoggedIn: true, data : {user: req.user }})
}

module.exports = {
    handleSignup,
    handleSignin,
    handleMe,
}