import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { LogIn, SignInWithGoogle } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white px-4 sm:px-2 md:px-6 lg:px-8">
            {/* Welcome Section */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 animate__animated animate__fadeIn animate__delay-1s">
                Welcome to <span className="text-yellow-400">Vihar</span>
            </h1>

            {/* SignIn Card */}
            <div className="bg-white shadow-2xl rounded-lg p-8 sm:w-80 max-w-md mb-6 animate__animated animate__fadeIn animate__delay-2s">
                <button
                    onClick={SignInWithGoogle}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-xl rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-300 mb-4"
                >
                    Continue with Google
                </button>
                <p className="text-center text-sm text-gray-500">
                    By continuing, you agree to our <span className="text-blue-500 cursor-pointer">Terms</span> & <span className="text-blue-500 cursor-pointer">Privacy Policy</span>
                </p>
            </div>

            {/* Login Card */}
            <div className="bg-white text-gray-800 rounded-lg shadow-xl p-6 sm:p-4 w-full sm:w-72 md:w-96 transition-all duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-3s">
                <h2 className="text-xl sm:text-lg md:text-2xl font-bold mb-4 sm:mb-3 text-center text-blue-500">
                    Login to <span className="text-blue-600">Vihar</span>
                </h2>
                <button
                    onClick={LogIn}
                    className="w-full py-3 text-base font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg"
                >
                    Login with Google
                </button>
            </div>

            {/* Additional Message */}
            <p className="text-sm mt-6 opacity-80 text-center">
                Sign in to book your ride.
            </p>
        </div>
    );
}