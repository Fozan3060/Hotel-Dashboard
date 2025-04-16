import React from 'react'
import { useSearchParams } from 'react-router'
import useGetBookings from './customhooks/getBookings'
import Filter_SortBookings from './Filter_SirtBookings'

const Booking: React.FC = () => {
  const { isLoading, data: Bookings } = useGetBookings()
  const [searchParams] = useSearchParams()

  const filter = searchParams.get('status') || 'all'
  const sortBy = searchParams.get('sortBy') || ''

  let filteredBookings = Bookings || []

  if (filter === 'confirmed') {
    filteredBookings = filteredBookings.filter(b => b.status === 'confirmed')
  } else if (filter === 'unconfirmed') {
    filteredBookings = filteredBookings.filter(b => b.status !== 'confirmed')
  }

  if (sortBy === 'minAmount') {
    filteredBookings = filteredBookings.sort((a, b) => a.totalPrice - b.totalPrice)
  } else if (sortBy === 'maxAmount') {
    filteredBookings = filteredBookings.sort((a, b) => b.totalPrice - a.totalPrice)
  }

  return (
    <div className='mx-auto px-4 sm:px-0 xl:w-[50rem] 2xl:w-[65rem]'>
      <div className='flex flex-col sm:flex-row justify-between'>
        <h1 className='text-gray-700 mb-5 sm:mb-0 font-bold text-4xl text-center sm:text-left pt-5'>
          All Bookings
        </h1>
        <Filter_SortBookings />
      </div>

      {/* Header Row (hidden on mobile) */}
      <div className='hidden sm:grid mt-10 border rounded-t-lg m-auto grid-cols-8 uppercase sm:text-base text-sm text-gray-700 font-semibold'>
        <div className='col-span-1 text-center py-3'>Cabin</div>
        <div className='col-span-2 py-3'>Guests</div>
        <div className='col-span-2 py-3'>Dates</div>
        <div className='col-span-2 py-3'>Status</div>
        <div className='col-span-1 py-3'>Amount</div>
      </div>

      {/* Booking Rows */}
      {filteredBookings.map((booking) => (
        <div
          key={booking.id}
          className='border bg-white border-t-0 m-auto text-sm sm:text-base text-gray-700 font-semibold mb-4 sm:mb-0 grid sm:grid-cols-8 sm:items-center sm:gap-2'
        >
          {/* Mobile Card View */}
          <div className='block sm:hidden p-4 space-y-2'>
            <div>
              <span className='font-semibold'>Cabin:</span> Cabin #{booking.cabins?.name}
            </div>
            <div>
              <span className='font-semibold'>Guest:</span> {booking.guests?.fullname}
            </div>
            <div className='text-zinc-500 text-sm'>{booking.guests?.email}</div>
            <div>
              <span className='font-semibold'>Dates:</span>{' '}
              {new Date(booking.startDate).toLocaleDateString()} –{' '}
              {new Date(booking.endDate).toLocaleDateString()}
            </div>
            <div>
              <span className='font-semibold'>Status:</span>{' '}
              <span
                className={`uppercase text-sm font-semibold px-3 py-1 rounded-3xl inline-block ${booking.status === 'confirmed'
                    ? 'text-green-600 bg-green-100'
                    : 'text-blue-600 bg-blue-100'
                  }`}
              >
                {booking.status}
              </span>
            </div>
            <div>
              <span className='font-semibold'>Amount:</span> ${booking.totalPrice}
            </div>
          </div>

          {/* Desktop Grid View */}
          <div className='hidden sm:flex items-center justify-center col-span-1 h-16'>
            <h1>Cabin #{booking.cabins?.name}</h1>
          </div>
          <div className='hidden sm:flex flex-col justify-center col-span-2'>
            <h1>{booking.guests?.fullname}</h1>
            <h1 className='text-zinc-500 text-sm'>{booking.guests?.email}</h1>
          </div>
          <div className='hidden sm:flex items-center col-span-2 h-16'>
            <h1>
              {new Date(booking.startDate).toLocaleDateString()} –{' '}
              {new Date(booking.endDate).toLocaleDateString()}
            </h1>
          </div>
          <div className='hidden sm:flex items-center col-span-2 h-16'>
            <h1
              className={`uppercase text-sm rounded-3xl px-4 py-2 text-center ${booking.status === 'confirmed'
                  ? 'text-green-600 bg-green-100'
                  : 'text-blue-600 bg-blue-100'
                }`}
            >
              {booking.status}
            </h1>
          </div>
          <div className='hidden sm:flex items-center justify-center col-span-1 h-16'>
            <h1>${booking.totalPrice}</h1>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Booking
