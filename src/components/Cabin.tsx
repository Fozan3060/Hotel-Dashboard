import React, { useEffect, useState } from 'react'
import { getCabins } from '../services/apiCabins'

type Props = {}

const Cabin = (props: Props) => {
  const [cabins, setCabins] = useState<any[]>([]); 

  useEffect(() => {
    const fetchCabins = async () => {
      const data = await getCabins();
      setCabins(data); 
      console.log(data); 
    };

    fetchCabins(); 
  }, []);

  return (
    <div>
      <h1>Cabins</h1>
      <ul>
        {cabins.map((cabin, index) => (
          <li key={index}>{cabin.name}</li> 
        ))}
      </ul>
    </div>
  )
}

export default Cabin;
