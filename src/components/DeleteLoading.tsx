
import React from 'react'

const DeleteLoading:React.FC = () => {
    return (
        <div className='flex flex-col items-center gap-4'>
            <h1 className='text-center text-gray-700 capitalize font-semibold'>Please Wait While We are deleting your cabin!</h1>
            <div className='flex items-center gap-4  '>
                <button disabled={true} type='button' className='flex items-center gap-2 py-2.5 px-5 text-md border border-gray-300 rounded-lg shadow-xs bg-gray-300 font-semibold text-gray-700 transition-all duration-500 '>
                    <svg className='w-5 h-5 stroke-zinc-900 animate-spin ' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <g clip-path='url(#clip0_9023_61563_1)'>
                            <path d='M14.6437 2.05426C11.9803 1.2966 9.01686 1.64245 6.50315 3.25548C1.85499 6.23817 0.504864 12.4242 3.48756 17.0724C6.47025 21.7205 12.6563 23.0706 17.3044 20.088C20.4971 18.0393 22.1338 14.4793 21.8792 10.9444' stroke='stroke-current' stroke-width='1.4' stroke-linecap='round' className='my-path'></path>
                        </g>
                        <defs>
                            <clipPath id='clip0_9023_61563_1'>
                                <rect width='24' height='24' fill='white'></rect>
                            </clipPath>
                        </defs>
                    </svg>Loading... </button>
            </div>
        </div>
    )
}

export default DeleteLoading