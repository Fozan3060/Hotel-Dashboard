import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getCabins } from '../../services/apiCabins';



const useFetchCabins = () => {
    return (useQuery({
        queryKey: ['getCabins'],
        queryFn: getCabins,
    }))
}

export default useFetchCabins