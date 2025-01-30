import { useQueryClient, useMutation } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { updateCabin } from '../../services/apiCabins';
import { CabinFormInputs } from '../CabinForm';


const useUpdateCabin = () => {
    const queryClient = useQueryClient();
    return (useMutation({
        mutationFn: (data: CabinFormInputs) => updateCabin(data, data.id ),
        onSuccess: () => {
            toast.success("Cabin Updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["getCabins"] });
        },
        onError: (error: any) => {
            toast.error(`Failed to delete cabin: ${error.message}`);
        },
    })
    )
}

export default useUpdateCabin