import supabase from './Supabase';

export async function getCabins () {
  let {data: guests, error} = await supabase.from ('guests').select ('*');

  if (error) {
    console.log ('Error fetching Guests');
  }
  return guests;
}
