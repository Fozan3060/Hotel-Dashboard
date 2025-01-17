import supabase from './Supabase';

export async function getCabins () {
  let {data: bookings, error} = await supabase.from ('bookings').select ('*');

  if (error) {
    console.log ('Error fetching bookings');
  }
  return bookings;
}
