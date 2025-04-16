import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getSettings } from '../../services/apiCabins';



const useFetchSettings = () => {
    return (useQuery({
        queryKey: ['getSettings'],
        queryFn: getSettings,
    }))
}

export default useFetchSettings