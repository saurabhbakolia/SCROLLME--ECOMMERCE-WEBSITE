import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

const ContributorCard = ({ login, avatar_url, html_url, contributions, type: initialType }) => {
    const [type, setType] = useState(initialType);

    useEffect(() => {
        if (login === 'saurabhbakolia') {
            setType('Admin');
        } else if (login === 'thakuratul2') {
            setType('Mentor');
        } else {
            setType(initialType);
        }
    }, [login, initialType]);

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="overflow-hidden bg-white rounded-lg shadow-lg"
        >
            <div className="p-6 text-center">
                <img src={avatar_url} alt={login} className="w-24 h-24 mx-auto mb-4 border-4 border-teal-500 rounded-full" />
                <h3 className="text-xl font-bold text-gray-800">{login}</h3>
                <p className="mb-2 text-sm text-teal-600">{type}</p>
                <div className="inline-block px-4 py-2 mt-4 bg-teal-100 rounded-full">
                    <span className="font-semibold text-teal-800">{contributions} contributions</span>
                </div>
            </div>
            <div className="flex items-center justify-between px-6 py-3 bg-gray-100">
                <a
                    href={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-teal-600 transition-colors hover:text-teal-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    View Profile
                </a>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
            </div>
        </motion.div>
    );
};

export default ContributorCard;