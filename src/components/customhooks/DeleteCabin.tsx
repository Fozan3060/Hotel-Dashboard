import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabins } from '../../services/apiCabins';

const useDeleteCabin = (setLoadingDelete: React.Dispatch<React.SetStateAction<boolean>>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteCabins(id),
        onSuccess: () => {
            toast.success("Cabin deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["getCabins"] });
            setLoadingDelete(false); 
        },
        onError: (error: any) => {
            toast.error(`Failed to delete cabin: ${error.message}`);
            setLoadingDelete(false);
        },
    });
};

export default useDeleteCabin;
