type MemberType = {
    name: string,
    role: string,
    status: boolean
}

function TeamMember({ name, role, status }: MemberType) {
  return (
    <div className='flex gap-6 justify-end items-center mt-6'>
        <div className='text-right'>
            <p className='font-bold'>{ name }</p>
            <p className='text-gray-600 text-sm'>{ role }</p>
        </div>

        <div className={`rounded-full w-8 h-8 flex justify-center items-center ${status ? 'bg-green-500' : 'bg-red-700'}`}>
            { name[0] }
        </div>
    </div>
  )
}

export default TeamMember
