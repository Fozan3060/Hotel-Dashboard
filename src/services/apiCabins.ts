import { CabinFormInputs } from "../components/CabinForm";
import supabase, { supabaseUrl } from "./Supabase";


export async function getCabins() {
  let { data: cabins, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.log('Error fetching cabins');
  }
  return cabins
}

export async function deleteCabins(id: number) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

  if (error) {
    console.log("Error deleting cabin")
    throw new Error("Cabin couldnot be deleted")
  }
  return data
}

export async function createCabin(cabinData: CabinFormInputs) {

  const cabinImage = `${Math.random()}-${cabinData.image.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${cabinImage}`;
  const { error: uploadError } = await supabase
    .storage
    .from('cabins-images') // Ensure this is the correct bucket
    .upload(cabinImage, cabinData.image, {
      cacheControl: '3600',
      upsert: false, // Prevent overwriting existing files
    });
  if (uploadError) {
    console.log("Error uploading image")
    throw new Error("Error uploading image")
  } const { error, data } = await supabase
    .from('cabins')
    .insert([{ ...cabinData, image: imagePath }]);
  if (error) {
    console.log(console.log(error));
    throw new Error("Error creating cabin")
  }
  return data
}

export async function updateCabin(cabin: CabinFormInputs, cabinId: string) {
  let imagePath;
  const hasImagePath = typeof cabin.image === 'string' && cabin.image.startsWith(supabaseUrl);

  if (hasImagePath) {
    imagePath = cabin.image
  }
  else {
    console.log("uploading new image")
    const cabinImage = `${Math.random()}-${cabin.image.name}`.replace("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${cabinImage}`
    const { error: uploadError } = await supabase
      .storage
      .from('cabins-images') // Ensure this is the correct bucket
      .upload(cabinImage, cabin.image, {
        cacheControl: '3600',
        upsert: false, // Prevent overwriting existing files
      });
    if (uploadError) {
      console.log("Error uploading image")
      throw new Error("Error uploading image")
    }
  }

  const { error } = await supabase
    .from('cabins')
    .update({ ...cabin, image: imagePath }).eq('id', cabinId)
    .select();
  console.log(error)

  if (error) {
    throw new Error("Error updating cabin")
  }
}