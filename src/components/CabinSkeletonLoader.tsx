import React from 'react'

const CabinSkeletonLoader: React.FC = () => {
    return (

        <div className='grid border-b bg-white items-center m-auto grid-cols-11 sm:grid-cols-10 2xl:w-[75rem] xl:w-[50rem] text-gray-700 font-semibold animate-pulse'>
            <div className='col-span-3 sm:flex-row flex-col flex items-center sm:gap-11'>
                <div className='bg-gray-200 sm:h-20 h-12 w-16 sm:w-28 rounded-md'></div>
                <div className='bg-gray-200 h-5 w-16 rounded'></div>
            </div>

            <div className='col-span-3'>
                <div className='bg-gray-200 h-5 w-3/4 rounded mx-auto'></div>
            </div>

            <div className='col-span-2'>
                <div className='bg-gray-200 h-5 w-1/2 rounded mx-auto'></div>
            </div>

            <div className='col-span-2 flex justify-between items-center'>
                <div className='bg-gray-200 h-5 w-1/2 rounded'></div>
                <div className='bg-gray-200 h-8 w-8 rounded-full mr-5'></div>
            </div>
        </div>


    )
}

export default CabinSkeletonLoader