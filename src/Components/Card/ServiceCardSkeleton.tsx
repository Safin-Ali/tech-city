import React from 'react';
import { BsImage } from 'react-icons/bs';

function ServiceCardSkeleton() {

    return (
        <div className={`services-card`}>
            <div className={`w-full h-[225px] flex animate-pulse justify-center items-center bg-slate-300 rounded-md`}>
                <BsImage className={`text-4xl text-slate-500`}></BsImage>
            </div>
            <div className={`animate-pulse`}>
                <div className={`w-1/2 my-2 mx-auto h-5 rounded-lg bg-slate-300`}></div>
                <div className={`w-[95%] my-2 mx-auto h-5 bg-slate-300`}></div>
                <div className={`w-[95%] my-2 mx-auto h-5 bg-slate-300`}></div>
            </div>
        </div>
    );
}

export default ServiceCardSkeleton;