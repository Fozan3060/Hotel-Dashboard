import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";
import Modal from 'react-modal';
import { Toaster } from 'react-hot-toast';
import useCreateCabin from './customhooks/CreateCabin';
import useUpdateCabin from './customhooks/UpdateCabin';

export type CabinFormInputs = {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: any | null;
    id: string; 
};

type CabinFormProps = {
    cabinToEdit: CabinFormInputs | null;
    setcabinToEdit: Dispatch<SetStateAction<CabinFormInputs | null>>;
    showform: boolean;
    setShowform: Dispatch<SetStateAction<boolean>>;
};
const CabinForm: React.FC<CabinFormProps> = ({ cabinToEdit, setcabinToEdit, showform, setShowform }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CabinFormInputs>({ defaultValues: cabinToEdit || {} });
    const { mutate: createCabin } = useCreateCabin();
    const { mutate: UpdateCabin } = useUpdateCabin();
 


    const onSubmit: SubmitHandler<CabinFormInputs> = (data) => {

        setShowform(false);
        if (cabinToEdit) {
            // Check if data.image is an array and contains files
            if (typeof data.image !== "string") {
                UpdateCabin({ ...data, image: data.image[0] }, cabinToEdit.id);
            } else {
                // If no image is selected, update without the image
                console.log("No image selected");
                UpdateCabin({ ...data }, cabinToEdit.id);
            }
        }

        else {
            createCabin({ ...data, image: data.image[0] });
        }
        reset();
    };
    useEffect(() => {
        if (cabinToEdit) {
            reset(cabinToEdit);
        }
    }, [cabinToEdit, reset]);
    const customStyles = {
        overlay: {
            zIndex: 10000,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: "transparent",
            border: "none",
            width: "50rem",
            zIndex: 9999,
            position: 'fixed',
        },
    };
    return (
        <>
            <div className='flex justify-center mt-10 '>
                <button onClick={() => {
                    setShowform(true)
                    setcabinToEdit(null)
                    reset({
                        name: '',
                        maxCapacity: 0,
                        regularPrice: 0,
                        discount: 0,
                        description: '',
                        image: null,
                    });
                }
                } className=' bg-gray-300 font-semibold rounded-md hover:bg-gray-500 hover:text-white transition-all duration-200 text-gray-700 px-8 py-4 '>Add a new cabin</button>
            </div >
            <Modal
                isOpen={showform}
                style={customStyles}
                contentLabel="Form Modal"
            >
                <div className="sm:max-w-lg sm:w-[30rem] w-[20rem] mx-auto mt-10 p-5 relative border rounded-lg shadow-lg bg-white">
                    <button onClick={() => setShowform(false)} className='absolute right-5'><RxCross2 size={28} /></button>
                    <h1 className="text-2xl font-bold text-center text-gray-700 mb-5">{!cabinToEdit && "Add a New Cabin"}</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Cabin Name</label>
                            <input
                                type="text"
                                {...register('name', { required: 'Cabin name is required' })}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 ring-red-200' : 'border-gray-300 ring-indigo-200'
                                    }`}
                                placeholder="Enter cabin name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Maximum Capacity</label>
                            <input
                                type="number"
                                {...register('maxCapacity', {
                                    required: 'Maximum capacity is required',
                                    min: { value: 1, message: 'Must be at least 1' },
                                })}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.maxCapacity ? 'border-red-500 ring-red-200' : 'border-gray-300 ring-indigo-200'
                                    }`}
                                placeholder="Enter maximum capacity"
                            />
                            {errors.maxCapacity && (
                                <p className="text-red-500 text-sm mt-1">{errors.maxCapacity.message}</p>
                            )}
                        </div>

                        {/* Regular Price */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Regular Price</label>
                            <input
                                type="number"
                                step="1"
                                {...register('regularPrice', {
                                    required: 'Regular price is required',
                                    min: { value: 0, message: 'Price cannot be negative' },
                                })}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.regularPrice ? 'border-red-500 ring-red-200' : 'border-gray-300 ring-indigo-200'
                                    }`}
                                placeholder="Enter regular price"
                            />
                            {errors.regularPrice && (
                                <p className="text-red-500 text-sm mt-1">{errors.regularPrice.message}</p>
                            )}
                        </div>

                        {/* Discount */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Discount</label>
                            <input
                                type="number"
                                step="1"
                                {...register('discount', {
                                    required: 'Discount is required',
                                    min: { value: 0, message: 'Discount cannot be negative' },
                                })}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.discount ? 'border-red-500 ring-red-200' : 'border-gray-300 ring-indigo-200'
                                    }`}
                                placeholder="Enter discount "
                            />
                            {errors.discount && (
                                <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Description</label>
                            <textarea
                                {...register('description', { required: 'Description is required' })}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.description ? 'border-red-500 ring-red-200' : 'border-gray-300 ring-indigo-200'
                                    }`}
                                rows={4}
                                placeholder="Enter cabin description"
                            ></textarea>
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Cabin image</label>
                            <input
                                type="file"
                                {...register('image', {
                                    required: !cabinToEdit ? 'Cabin image is required' : false,
                                })}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />

                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>}

                        </div>
                        <button
                            type="submit"
                            className="w-full bg-zinc-600 text-white py-2 rounded-md hover:bg-zinc-700 transition"
                        >
                            {cabinToEdit ? "Edit Cabin" : "Add Cabin"}
                        </button>
                    </form>
                </div>
            </Modal>
            <Toaster />
        </>
    );
};

export default CabinForm;
