import React from 'react';
import verify from "../../assets/verify.png"
const VerificationBadge = () => {
    return (
        <div className='bg-blue-500 pl-1 py-1 w-[75px] flex rounded-lg text-xs'>
            <img className='w-4 h-4 mr-1' src={verify} alt="" />
            <span className="font-semibold text-white">
                Verified
            </span>
        </div>
    );
};

export default VerificationBadge;