const {z} = require('zod')

const userSignUpValidationSchema = z.object({
    firstname : z.string().min(2).max(25),
    lastname : z.string().min(2).max(25).optional(),
    email: z.string().email(),
    password: z.string()
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/\d/, 'Must contain at least one number')
    .regex(/[!@#$%^&*()_+{}\[\]:;<>,.?]/, 'Must contain at least one special character')
    .min(8, 'Must be at least 8 characters long'),
  
})

const userSignInValidationSchema = z.object({
    email: z.string().email(),
    password: z.string()
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/\d/, 'Must contain at least one number')
    .regex(/[!@#$%^&*()_+{}\[\]:;<>,.?]/, 'Must contain at least one special character')
    .min(8, 'Must be at least 8 characters long'),
})

module.exports = {userSignUpValidationSchema,userSignInValidationSchema }