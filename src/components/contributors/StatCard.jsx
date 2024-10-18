import { motion } from "framer-motion";

const StatCard = ({ label, value, icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center p-6 bg-white rounded-lg shadow-lg"
    >
        <div className="p-3 mr-4 bg-teal-100 rounded-full">
            {icon}
        </div>
        <div>
            <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            <p className="text-gray-600">{label}</p>
        </div>
    </motion.div>
);

export default StatCard;