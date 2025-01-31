import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import TeamMember from './TeamMember'

type userType = {
    id: string,
    username: string,
    email: string,
    password: string
}

function Dashboard() {
    const navigate = useNavigate()
    const data: string | null = localStorage.getItem('user')
    const [ userData, setUserData ] = useState<userType>({
        id: '000',
        username: 'guest',
        email: '',
        password: ''
    })
    const teamMembers = [
        {
          name: "Alice Johnson",
          role: "Lead Developer",
          status: true
        },
        {
          name: "Bob Williams",
          role: "UX/UI Designer",
          status: true
        },
        {
          name: "Charlie Davis",
          role: "Marketing Specialist",
          status: false 
        },
        {
          name: "David Rodriguez",
          role: "Project Manager",
          status: true
        }
    ];

    useEffect(() => {
        if (!data) {
            navigate('/guest')
        } else {
            const parsedData = JSON.parse(data)
            setUserData(parsedData)
        }
    }, [])

    const handleLogOut = () => {
        const userConfirm = confirm('Confirm log out?')
        
        if (!userConfirm) return

        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <div className='grid'>
            <div style={{ gridArea: '1 / 1 / 2 / 3'}}>
                <h1 className='text-4xl'>{ userData.username } <span className='text-green-950 text-2xl'>#{userData.id}</span></h1>

                <br />
                <button onClick={handleLogOut} className='bg-red-700 px-3 text-white py-2 rounded-lg'>Logout</button>
            </div>

            <div>
                Progress

                <div className='w-full h-full flex justify-center items-center text-7xl font-bold text-green-950'>
                    15%
                </div>
            </div>

            <div style={{ gridArea: '2 / 1 / 4 / 4'}} className='w-full'>
                Documents

                <div className="flex gap-2 mt-2 w-full">
                    <div className="flex justify-baseline items-center p-2 rounded-md bg-green-950 text-white font-bold">Project Details</div>
                    <div className="border flex justify-baseline items-center break-all p-2 rounded-md hover:underline"><a href="https://docs.google.com/document/d/1VsBkqhTSXxYfarYg_sHrwKA35mX_HRYberNDO8UHQM8/edit?usp=sharing" target='_blank'>https://docs.google.com/document/d/1VsBkqhTSXxYfarYg_sHrwKA35mX_HRYberNDO8UHQM8/edit?usp=sharing</a></div>
                </div>
            </div>

            <div style={{ gridArea: '1 / 4 / 3 / 5'}}>
                Teams

                <div className='flex flex-col'>
                    {
                        teamMembers.map((team, index) => (
                            <TeamMember key={index} name={team.name} role={team.role} status={team.status} />
                        ))
                    }
                </div>
            </div>
            
            <div style={{ gridArea: '1 / 5 / 3 / 7', overflow: 'hidden' }}>
                Chats

                <img src="public/chat.png" title='Fake chat'/>
                <div className='flex justify-between gap-4'>
                    <input type="text" className='w-4/5 h-10 rounded-full border outline-none px-4'/>
                    <button 
                        className='w-1/5 bg-green-950 text-white rounded-full' 
                        onClick={() => alert('Chat sended!')}
                    >Send</button>
                </div>
            </div>

            <div style={{ gridArea: '3 / 4 / 4 / 7', display: 'flex', flexDirection: 'column' }}>
                Notes

                <textarea className='resize-none outline-none mt-2 h-full' defaultValue='Ask Bob about design, finish Davids task' />
            </div>
        </div>
    )
}

export default Dashboard
