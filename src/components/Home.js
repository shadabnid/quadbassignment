import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { Link } from 'react-router-dom';



const Home = () => {
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                 setIsLoading(true);
                  const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
                  const jsonData = await response.json();
                //   console.log(jsonData); 
                  setData(jsonData);
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

    {isLoading?(
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
    )
    :(
        <div className='flex flex-wrap justify-center bg-blue-200 gap-10 p-[2rem]'>
        {
          data.map((item)=>(
            <div key={item.show.id} className='flex flex-col gap-6 justify-center items-center'>
             
            <div  className='flex flex-col w-[15rem] h-[10rem] bg-black text-white  border-2  border-white rounded-[15px] p-[1rem]'>
                
                <div><h1 className='text-[2rem]'>{item.show.name}</h1></div>
                <div>
                  <div>Rating : {item.show.rating.average?item.show.rating.average:'NA'}</div>
                  <div>{item.show.language}</div>
                </div>
            </div>
             <Link to={`/summary/${item.show.id}`} className='border-1 rounded-[10px] border-blue-700 bg-blue-400 p-[0.7rem]'>Summary</Link> 
            </div>
           ))
          }
          </div>
          )
        }
        </div>
  )
}

export default Home