import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';

const useCreateCabin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("Cabin added successfully!");
            queryClient.invalidateQueries({ queryKey: ["getCabins"] });
        },
        onError: (error: any) => {
            toast.error(`Failed to add cabin: ${error.message}`);
        },
    });
};

export default useCreateCabin;
