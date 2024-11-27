import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { LogIn } = useAuth();

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-4">
            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 w-full sm:w-80 md:w-96">
                <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
                    Login to <span className="text-blue-500">Vihar</span>
                </h1>
                <button
                    onClick={LogIn}
                    className="w-full py-3 text-sm sm:text-base font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md"
                >
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;