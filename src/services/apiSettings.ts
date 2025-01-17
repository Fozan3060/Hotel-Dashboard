import supabase from './Supabase';

export async function getCabins () {
  let {data: settings, error} = await supabase.from ('settings').select ('*');

  if (error) {
    console.log ('Error fetching settings');
  }
  return settings;
}
