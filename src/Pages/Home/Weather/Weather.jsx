import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { tempInCelCius, tempInFahrenheit } from "../../../Hooks/Convarted";
import Lottie from "lottie-react";
import wimg from "../../../../public/wimg.json"
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
console.log(data.main);
const { main, wind, coord, name, sys } = data;

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
            {/* weather card */}


            <section className=" w-[fit-content] mx-auto mt-6 ">
            <div className="max-w-xs overflow-hidden rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100">
	<div className="flex items-end justify-end h-32 p-4 dark:bg-gray-500 bg-center bg-cover " >

        <div className="">

        </div>
		<p className="px-2 py-1 text-sm tracki dark:text-gray-100 uppercase dark:bg-gray-800 bg-opacity-75 rounded shadow-lg">{data.name}</p>
	</div>
	<div className="flex justify-between p-4">
		<div className="flex flex-col flex-1 gap-4">
			<div className="flex justify-between">
				<div className="flex gap-2">
					<span className="text-5xl font-semibold">{tempInCelCius(main ? main?.temp : 273)}<sup>&#176;C</sup></span>
					<span className="text-lg dark:text-gray-400">/ {tempInFahrenheit(main ? main?.temp : 273)} <sup>°F</sup></span>
				</div>
                
				<div className="w-[40%]">
                <Lottie className=" "  animationData={wimg} />
                </div>
			</div>
            <div className="flex justify-between items-center">
                   <div>
                   <span>Country- { sys?.country}</span>
                    <h2 className="text-3xl font-bold"> { data?.name}</h2>
                   </div>
                   <div>
                   <span className="text-lg dark:text-gray-400">Feels Like {tempInFahrenheit(main ? main?.feels_like : 273)}<sup>°F</sup></span>
                   <p className="text-lg dark:text-gray-400">Humidity {main?.humidity}<sup>%</sup></p>
                   </div>
                </div>
			<div className="flex justify-between items-center">
            <p className="text-sm" >
				Max Temp {tempInCelCius(main ? main?.temp_max : 273)}<sup>&#176;C</sup> /{tempInFahrenheit(main ? main?.temp_max : 273)}<sup>°F</sup>
                </p>
                <p className="text-sm" >
				Min Temp {tempInCelCius(main ? main?.temp_min : 273)}<sup>&#176;C</sup> /{tempInFahrenheit(main ? main?.temp_min : 273)}<sup>°F</sup>
			</p>
            </div>
		</div>
		<div className="text-sm leadi">
			<div className="flex items-center"></div>
		</div>
	</div>
	<div className="flex items-center justify-between gap-8 p-4 border-t dark:text-gray-400 dark:border-gray-700">
		<div className="flex items-center space-x-1">
			<span className="font-bold">Longitude - </span>
			<span className="text-sm">{coord?.lon}</span>
		</div>
		
		<div className="flex items-center space-x-1">
			<span className="font-bold">Latitude - </span>
			<span className="text-sm">{coord?.lat}</span>
		</div>
	</div>
</div>
            </section>
        </div>
    );
};

export default Weather;