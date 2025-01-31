import { Link } from 'react-router-dom'

function ErrorElement() {
    return (
        <div className="min-h-screen bg-green-950 flex flex-col items-center justify-center">
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">Oops!</h1>
            <p className="text-2xl text-gray-600 mb-6">Something went wrong!</p>
            <p className="text-lg text-gray-500 mb-8">404 - Page Not Found</p>
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded">
                <Link to='/'>GO BACK</Link>
            </button>
          </div>
        </div>
    );
}

export default ErrorElement
