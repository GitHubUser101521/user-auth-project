import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email format')
        .test(
            'is-unique',
            'Email is already taken, try logging in instead of registering', 
            async (value) => {      
              try {
                const response = await fetch(`http://localhost:3000/users?email=${value}`)
                
                if (response.ok) {
                    const data = await response.json()

                    if (data.length >= 1) {
                        return false
                    } else {
                        return true
                    }
                } else {
                    return false
                }
              } catch (error) {
                console.error('Error checking email uniqueness:', error);
                return false; // Assume not unique on error to be safe
              }
            }
        ),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be atleast 6 characters long')
})

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be atleast 6 characters long')
})