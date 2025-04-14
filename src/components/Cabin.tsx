import React, { useEffect, useState } from 'react';
import { getCabins } from '../services/apiCabins';
import { useQuery } from '@tanstack/react-query';
import { CiMenuKebab } from "react-icons/ci";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from 'framer-motion';
import Modal from 'react-modal';
import CabinForm, { CabinFormInputs } from './CabinForm';
import useDeleteCabin from './customhooks/DeleteCabin';
import DeleteLoading from './DeleteLoading';
import CabinSkeletonLoader from './CabinSkeletonLoader';

const Cabin:React.FC = () => {
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [showform, setShowform] = useState<boolean>(false);
  const [cabinToEdit, setcabinToEdit] = useState<CabinFormInputs | null>(null);

  const { isLoading, data: cabins } = useQuery({
    queryKey: ['getCabins'],
    queryFn: getCabins
  });

  const { mutate: DeleteCabin } = useDeleteCabin(setLoadingDelete);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        !target.closest('.kebab-button') &&
        !target.closest('.dropdown-menu')
      ) {
        setOpenModal(null);
      }
    };

    if (openModal !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openModal]);

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
      height: "fit-content",
      width: "20rem"
    },
  };

  return (
    <div>
      <h1 className='text-gray-700 font-bold text-4xl text-center pt-5'>All Cabins</h1>
      <div className='grid mt-10 border rounded-t-lg m-auto grid-cols-11 sm:grid-cols-10 2xl:w-[75rem] xl:w-[50rem] uppercase sm:text-base text-sm text-gray-700 font-semibold'>
        <div className='col-span-3'><h1 className='py-3 text-center'>Cabins</h1></div>
        <div className='col-span-3'><h1 className='py-3 '>Capacity</h1></div>
        <div className='col-span-2'><h1 className='py-3 '>Price</h1></div>
        <div className='col-span-2'><h1 className='py-3 '>Discount</h1></div>
      </div>

      <div>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => <CabinSkeletonLoader key={idx} />)
        ) : (
          cabins?.map((cabin, index) => (
            <div key={cabin.id} className='grid border-b sm:text-base text-sm bg-white items-center m-auto grid-cols-11 sm:grid-cols-10 2xl:w-[75rem] xl:w-[50rem] uppercase text-gray-700 font-semibold'>
              <div className='col-span-3 sm:flex-row flex-col flex items-center sm:gap-11'>
                <img src={cabin.image} className='sm:h-20 h-12 w-16 sm:w-28' alt="" />
                <h1 className='font-semibold '>00{cabin.name}</h1>
              </div>
              <div className='col-span-3'><h1 className='py-3 capitalize'>{cabin.description}</h1></div>
              <div className='col-span-2'><h1 className='py-3 '>${cabin.regularPrice.toFixed(2)}</h1></div>
              <div className='col-span-2 flex justify-between items-center'>
                <h1 className='py-3 text-green-700 '>${cabin.discount.toFixed(2)} </h1>
                <div className='relative'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenModal((prev) => prev === index ? null : index);
                    }}
                    className='kebab-button hover:bg-gray-100 rounded-md transition-all duration-200 p-1 text-2xl mr-5'
                  >
                    <CiMenuKebab />
                  </button>

                  <AnimatePresence>
                    {openModal === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className='dropdown-menu absolute flex flex-col justify-center right-10 capitalize text-sm w-32 h-24 bg-white shadow-lg rounded-md'
                      >
                        <button onClick={() => {
                          setcabinToEdit(cabin);
                          setShowform(true);
                          setOpenModal(null);
                        }} className='flex items-center gap-3 pl-4 h-1/3 transition-all duration-200 hover:bg-gray-100 '>
                          <MdModeEditOutline />
                          Edit
                        </button>
                        <button onClick={() => {
                          DeleteCabin(cabin.id);
                          setLoadingDelete(true);
                        }} className='flex items-center gap-3 pl-4 h-1/3 transition-all duration-200 hover:bg-gray-100'>
                          <FaTrash />
                          <h1>Delete</h1>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))
        )}
      
      </div>

      <Modal
        isOpen={loadingDelete}
        style={customStyles}
        contentLabel="Loading Modal"
      >
        <DeleteLoading />
      </Modal>

      <CabinForm
        cabinToEdit={cabinToEdit}
        setcabinToEdit={setcabinToEdit}
        setShowform={setShowform}
        showform={showform}
      />
    </div>
  );
};

export default Cabin;
