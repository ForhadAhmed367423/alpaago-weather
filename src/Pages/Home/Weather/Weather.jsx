import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";

const Weather = () => {
    const [city , setCity]=useState('Dhaka');
    const ref = useRef(null);
    const {data={}} = useQuery({
        queryKey:['weather',city],
        queryFn:async ()=>{
            try{
                const {data:weatherData}=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=159596cb0c1b6e763549db520fe63f16`)
        return  weatherData;
            }
            catch{
                setCity('Dhaka')
                alert('City not found')
            }
        }

        
    });
    const handleSearch=()=>{
        const value =ref?.current?.value;
        if(!value){
            return 
        }
        setCity(value)
    }
console.log(data);
    return (
        <div >
            {/* search */}
            <fieldset className=" w-full space-y-1 dark:text-gray-100">
	<label  className="hidden">Search</label>
	<div className="relative w-[fit-content] mx-auto">
		<span className="absolute inset-y-0 left-0 flex items-center pl-2">
			<button onClick={handleSearch} type="button" title="search" className="p-1 focus:outline-none focus:ring">
				<svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-100">
					<path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
				</svg>
			</button>
		</span>
		<input ref={ref} type="search" name="Search" placeholder="Search your city..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400" />
	</div>
</fieldset>
            
        </div>
    );
};

export default Weather;