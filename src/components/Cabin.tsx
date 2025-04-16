import React, { useEffect, useState } from 'react';
import { CiMenuKebab } from "react-icons/ci";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from 'framer-motion';
import CabinForm, { CabinFormInputs } from './CabinForm';
import useDeleteCabin from './customhooks/DeleteCabin';
import CabinSkeletonLoader from './CabinSkeletonLoader';
import LoadingModal from './LoadingModal';
import useFetchCabins from './customhooks/FetchCabin';
import Filter_SortCabin from './Filter_SortCabin';
import { useSearchParams } from 'react-router';

const CABINS_PER_PAGE = 3;

const Cabin: React.FC = () => {
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [showform, setShowform] = useState<boolean>(false);
  const [cabinToEdit, setcabinToEdit] = useState<CabinFormInputs | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { isLoading, data: cabins } = useFetchCabins();
  const [searchParams] = useSearchParams();
  const discountFilter = searchParams.get('discount');
  const sortBy = searchParams.get('sortBy');

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

  let filteredCabins = cabins?.filter(cabin => {
    if (discountFilter === 'discount') return cabin.discount > 0;
    if (discountFilter === 'no-discount') return cabin.discount === 0;
    return true;
  });

  if (sortBy) {
    filteredCabins = [...(filteredCabins || [])];
    switch (sortBy) {
      case 'minPrice':
        filteredCabins.sort((a, b) => a.regularPrice - b.regularPrice);
        break;
      case 'maxPrice':
        filteredCabins.sort((a, b) => b.regularPrice - a.regularPrice);
        break;
      case 'minDiscount':
        filteredCabins.sort((a, b) => a.discount - b.discount);
        break;
      case 'maxDiscount':
        filteredCabins.sort((a, b) => b.discount - a.discount);
        break;
    }
  }

  const totalPages = Math.ceil((filteredCabins?.length || 0) / CABINS_PER_PAGE);
  const startIdx = (currentPage - 1) * CABINS_PER_PAGE;
  const currentCabins = filteredCabins?.slice(startIdx, startIdx + CABINS_PER_PAGE);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className='2xl:w-[65rem] mx-auto xl:w-[50rem] overflow-x-hidden'>
      <div className='sm:flex-row flex-col sm:h-auto justify-between'>
        <h1 className='text-gray-700 font-bold text-4xl text-center sm:text-left pt-5'>All Cabins</h1>
        <Filter_SortCabin />
      </div>

      <div className='grid mt-10 border rounded-t-lg m-auto grid-cols-11 sm:grid-cols-10 uppercase sm:text-base text-sm text-gray-700 font-semibold'>
        <div className='col-span-3'><h1 className='py-3 text-center'>Cabins</h1></div>
        <div className='col-span-3'><h1 className='py-3 '>Capacity</h1></div>
        <div className='col-span-2'><h1 className='py-3 '>Price</h1></div>
        <div className='col-span-2'><h1 className='py-3 '>Discount</h1></div>
      </div>

      <div>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => <CabinSkeletonLoader key={idx} />)
        ) : (
          currentCabins?.map((cabin, index) => (
            <div key={cabin.id} className='grid border-b sm:text-base text-sm bg-white items-center m-auto grid-cols-11 sm:grid-cols-10 uppercase text-gray-700 font-semibold'>
              <div className='col-span-3 sm:flex-row flex-col flex items-center sm:gap-11'>
                <img src={cabin.image} className='sm:h-20 h-12 w-16 sm:w-28' alt="" />
                <h1 className='font-semibold'>00{cabin.name}</h1>
              </div>
              <div className='col-span-3'><h1 className='py-3 capitalize'>{cabin.description}</h1></div>
              <div className='col-span-2'><h1 className='py-3 '>${cabin.regularPrice.toFixed(2)}</h1></div>
              <div className='col-span-2 flex justify-between items-center'>
                <h1 className='py-3 text-green-700 '>${cabin.discount.toFixed(2)}</h1>
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
                        <button
                          onClick={() => {
                            setcabinToEdit(cabin);
                            setShowform(true);
                            setOpenModal(null);
                          }}
                          className='flex items-center gap-3 pl-4 h-1/3 transition-all duration-200 hover:bg-gray-100 '
                        >
                          <MdModeEditOutline />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            DeleteCabin(cabin.id);
                            setLoadingDelete(true);
                          }}
                          className='flex items-center gap-3 pl-4 h-1/3 transition-all duration-200 hover:bg-gray-100'
                        >
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

      {/* Pagination Controls */}
      {filteredCabins && filteredCabins.length > 0 && (
        <div className='flex justify-center items-center mt-6 gap-4'>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-white ${currentPage === 1 ? 'bg-gray-400' : 'bg-zinc-600 hover:bg-zinc-700'}`}
          >
            Prev
          </button>
          <span className='text-gray-700 font-semibold'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md text-white ${currentPage === totalPages ? 'bg-gray-400' : 'bg-zinc-600 hover:bg-zinc-700'}`}
          >
            Next
          </button>
        </div>
      )}

      <LoadingModal msg='Please Wait While We are deleting your cabin' type='Deleting' LoadingOpen={loadingDelete} />

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
