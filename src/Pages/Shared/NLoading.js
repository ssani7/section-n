import React from 'react';
import { motion } from 'framer-motion'

const NLoading = () => {
    const icon = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            fill: "rgba(255, 255, 255, 0)"
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            fill: "rgba(255, 255, 255, .5)",
            transition: {
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0
            }

        }
    };
    return (
        <div className='cbody bg-base-100'>
            <div className="container w-72 h-72 bg-base-300">
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="16.897 95.742 578.207 600.517"
                    className="item"
                >
                    <motion.path
                        d="M16.897 696.259V95.742L372.48 311.7s10.494-18.844-4.455-30.427l-14.949-11.551-18.844-13.695 115.272-69.368v268.43L119.892 255.994v324.794s2.476 57.817-22.242 72.041-80.753 43.43-80.753 43.43z"
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                    />
                    <motion.path
                        d="M595.104 95.742v600.517L239.52 480.301s-10.494 18.844 4.455 30.427l14.949 11.551 18.844 13.695-115.271 69.367V336.945l329.611 199.062V211.179s-2.475-57.817 22.242-72.041c24.718-14.223 80.754-43.396 80.754-43.396z"
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                    />
                </motion.svg>
            </div>
        </div>
    );
};

export default NLoading;