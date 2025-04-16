import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SettingsSkeletonLoader from './SettingsSkeletonLoader';
import { Toaster } from 'react-hot-toast';
import LoadingModal from './LoadingModal';
import useFetchSettings from './customhooks/FetchSettings';
import useUpdateSettings from './customhooks/UpdateSettings';

type SettingsForm = {
  minBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};
const Settings: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SettingsForm>({
    defaultValues: {
      minBookingLength: 1,
      maxGuestsPerBooking: 1,
      breakfastPrice: 0,
    },
  });

  const { isLoading, data: settings } = useFetchSettings()
  const { mutate, isPending: isSaving } = useUpdateSettings()

  // ⬇️ When settings are fetched, reset form with those values
  useEffect(() => {
    if (settings && settings.length > 0) {
      const setting = settings[0];
      reset({
        minBookingLength: setting.minBookingLength,
        maxGuestsPerBooking: setting.maxGuestsPerBooking,
        breakfastPrice: setting.breakFastPrice, // Note: this is break**F**astPrice
      });
    }
  }, [settings, reset]);
  const onSubmit = (data: SettingsForm) => {
    mutate(data);
  };


  if (isLoading) return <SettingsSkeletonLoader />;
  return (

    <div className="pt-5">
      <div className="max-w-md mx-auto sm:ml-36 w-80 sm:w-full p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="minBookingLength" className="block mb-1 font-medium">
              Minimum Booking Length
            </label>
            <input
              type="number"
              id="minBookingLength"
              {...register('minBookingLength', { required: true, min: 1 })}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.minBookingLength && (
              <span className="text-sm text-red-500">
                Minimum booking length must be at least 1
              </span>
            )}
          </div>

          <div>
            <label htmlFor="maxGuestsPerBooking" className="block mb-1 font-medium">
              Max Guests Per Booking
            </label>
            <input
              type="number"
              id="maxGuestsPerBooking"
              {...register('maxGuestsPerBooking', { required: true, min: 1 })}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.maxGuestsPerBooking && (
              <span className="text-sm text-red-500">Must allow at least 1 guest</span>
            )}
          </div>

          <div>
            <label htmlFor="breakfastPrice" className="block mb-1 font-medium">
              Breakfast Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              id="breakfastPrice"
              {...register('breakfastPrice', { required: true, min: 0 })}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.breakfastPrice && (
              <span className="text-sm text-red-500">Price must be 0 or greater</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-600 text-white py-2 rounded-xl hover:bg-zinc-700 transition"
          >
            Save
          </button>
          <LoadingModal type='saving' msg='Please wait while are saving you settings' LoadingOpen={isSaving} />
        </form>
      </div>
      <Toaster />

    </div>
  );
};

export default Settings;
