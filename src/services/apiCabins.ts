import supabase from "./Supabase";


export async function getCabins () {
  let {data: cabins, error} = await supabase.from ('cabins').select ('*');
  if (error) {
    console.log ('Error fetching cabins');
  }
 return cabins
}
