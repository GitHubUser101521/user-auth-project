import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useFormik } from 'formik';
import { loginSchema } from '../validationSchemas'

function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [ errorLogIn, setErrorLogIn ] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
            alert('You are logged in.')
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(`http://localhost:3000/users?email=${values.email}`)

                if (response.ok) {
                    const data = await response.json()

                    if (!(data[0].password === values.password)) {
                        setErrorLogIn(true) 
                        return
                    }

                    const userData = data[0]
                    localStorage.setItem('user', JSON.stringify(userData))
                    navigate('/')
                } else {
                    console.error('Error fetching data from server')
                    return
                }
                
            } catch (error) {
                console.error(error)
            }
        },
    });

    return (
        <div className='flex mx-48 my-8'>
            <div className='w-1/2 pr-12'>
                <img
                    src="/olara-logo.png"
                    alt="Olara"
                    className='mb-10'
                />

                <h2 className='text-4xl font-bold'>Log in</h2>

                <form className='mt-10 flex flex-col' onSubmit={formik.handleSubmit}>

                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@gmail.com"
                        className='input-border'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="formik-error">{formik.errors.email}</div>
                    ) : null}

                    <label htmlFor="password">Password</label>
                    <div className='input-border flex justify-between items-center'>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            placeholder="••••••••"
                            required
                            className='w-full border-none outline-none'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <span
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className='w-4 mr-1'
                        >
                            <img
                                src={passwordVisible ? '/see-password-icon.png' : '/hide-password-icon.png'}
                                alt={passwordVisible ? 'Hide' : 'Show'}
                            />
                        </span>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="formik-error">{formik.errors.password}</div>
                    ) : null}

                    <div className="flex justify-between items-center text-sm">
                        <p className='text-sm text-gray-600 mt-2'>
                            Don't have an account yet? <span className='link'><Link to="/register">Register</Link></span>
                        </p>

                        <p className="link" onClick={() => alert('Too bad, maybe write it down next time')}>
                            Forgot Password?
                        </p>
                    </div>

                    <button
                        type="submit"
                        className='bg-dark-green rounded-lg text-white py-2 my-8'
                        disabled={!formik.isValid} // Disable the button if the form is invalid
                    >Log in</button>
                    {errorLogIn && <div className="formik-error">Invalid Credentials</div>}
                </form>

                <div className="or-divider flex items-center">
                    <span className='mx-2 text-gray-500 text-sm'>OR</span>
                </div>

                <div 
                    className='flex justify-center items-center input-border w-full mt-8'
                    onClick={() => alert('Sorry, this feature is not completed yet!')}
                >
                    <img src="/google-icon.png" className='w-8' alt="Google Icon" /> {/* Added alt attribute */}
                    <span>Continue with Google</span>
                </div>
            </div>

            <div className='w-1/2 bg-dark-green rounded-3xl flex p-4 items-center'>
                <img src="/dashboard.png" className='h-fit'/>
            </div>
        </div>
    );
}

export default Login;