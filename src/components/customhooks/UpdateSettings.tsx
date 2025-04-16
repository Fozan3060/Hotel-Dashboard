import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { updateSettings } from '../../services/apiCabins';
import toast from 'react-hot-toast';



const useUpdateSettings = () => {
    const queryClient = useQueryClient();

    return (useMutation({
        mutationFn: updateSettings,
        onSuccess: () => {
            toast.success("Settings saved successfully!");
            queryClient.invalidateQueries({ queryKey: ['getSettings'] });
        },
        onError: (error: any) => {
            toast.error(`Failed to save settings: ${error.message}`);
        },
    }))
}

export default useUpdateSettings