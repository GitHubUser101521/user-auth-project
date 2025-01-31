import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useFormik } from 'formik';
import { registerSchema } from '../validationSchemas'

function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
            alert('You are logged in.')
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
    
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    
                    const userData = JSON.stringify(data)
                    localStorage.setItem('user', userData)

                    if (localStorage.getItem('user')) {
                        navigate('/')
                    }
                }

                console.error('Error posting to server')
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

                <h2 className='text-4xl font-bold'>Register</h2>

                <form className='mt-10 flex flex-col' onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        className='input-border'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="formik-error">{formik.errors.username}</div>
                    ) : null}

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

                    <p className='text-sm text-gray-600 mt-2'>
                        Already have an account? <span className='link'><Link to="/login">Log in</Link></span>
                    </p>

                    <button
                        type="submit"
                        className='bg-dark-green rounded-lg text-white py-2 my-8'
                        disabled={!formik.isValid} // Disable the button if the form is invalid
                    >Register</button>
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

export default Register;