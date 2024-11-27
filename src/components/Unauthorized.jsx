import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate(-1);
        }, 3000);
    }, [navigate]);

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
            <div className="text-center p-8 bg-white rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105">
                <h1 className="text-4xl font-bold text-pink-600 mb-4 animate__animated animate__bounceIn">
                    404
                </h1>
                <p className="text-xl text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
                <p className="text-lg text-gray-600">You'll be redirected shortly...</p>
            </div>
        </div>
    );
}
