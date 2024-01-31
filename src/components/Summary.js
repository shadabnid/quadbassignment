import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner'

const Summary = () => {
    const { itemId } = useParams();
    const [isLoading,setIsLoading] = useState(false);
    
    const [data,setData] = useState({});
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                  setIsLoading(true);
                  const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
                  const jsonData = await response.json();
                  
                   const filter = jsonData.filter((item)=>{
                     return itemId == item.show.id;
                   })
                   const show = filter[0].show;
                  setData(show);
                  console.log(show);
                  setIsLoading(false);

            }
            catch(err){
                console.log("Error in fetching data ", err);
            }
        }
        fetchData();
    },[]);
    
  return (
    <div>
      {
        isLoading?(
          <div className='flex justify-center items-center'>

          <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      
      />
      </div>

        ):(
            <div className='flex flex-col flex-wrap justify-center items-center gap-10 bg-blue-200 h-[100vh]'>
              <h1 className='text-black text-[500] text-[3rem]'>{data.name}</h1>

              <div className='bg-black w-[60%] rounded-[20px] p-[2rem] text-white border-2' dangerouslySetInnerHTML={{__html: data.summary}}/>
            </div>
        )
      }

    </div>
      
  )
}

export default Summary