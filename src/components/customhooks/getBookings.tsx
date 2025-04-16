import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getBookings } from '../../services/apiCabins';



const useGetBookings = () => {
    return (useQuery({
        queryKey: ['getBookings'],
        queryFn: getBookings,
    }))
}

export default useGetBookings