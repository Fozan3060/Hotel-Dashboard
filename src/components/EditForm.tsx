import React from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

export type CabinFormInputs = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: any
};

const EditForm = ({ setOpenEditModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: CabinFormInputs) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-md mx-auto">
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
            step="0.01"
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
            step="0.01"
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
            className={`w-full px-3 py-2 h-16 border rounded-md focus:outline-none focus:ring-2 ${errors.description ? 'border-red-500 ring-red-200' : 'border-gray-300 ring-indigo-200'
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
            {...register('image', { required: 'Cabin image is required' })}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>}

        </div>
        <div className="flex justify-between sm:justify-end space-x-4">
          <button
            onClick={() => setOpenEditModal(false)}
            type="button"
            className="px-8 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 font-semibold rounded-md hover:bg-indigo-700 hover:text-white transition-all duration-200 text-white px-8 py-4 "
          >
            Edit cabin
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
