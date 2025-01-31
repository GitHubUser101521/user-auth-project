import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

function GuestDashboard() {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
        }
    }, [])

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            <img src="/unauthorized-icon.png" alt="Unauthorized" className='w-60 aspect-square'/>
            <h1 className='text-3xl font-bold'>Unauthorized Access</h1>
            <p>Please log in and try again</p>
            <button className='bg-green-950 px-4 py-2 rounded-lg text-white'><Link to='/login'>LOG IN</Link></button>
        </div>
    )
}

export default GuestDashboard
