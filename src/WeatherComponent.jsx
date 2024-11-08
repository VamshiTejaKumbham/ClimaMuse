import React, { useState } from 'react';
import axios from 'axios';
import { Mistral } from '@mistralai/mistralai';
// import './weatherComponent.css';
import './index.css';


const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [poetry, setPoetry] = useState(null);

  // const apiKey = process.env.REACT_APP_MISTRAL_API_KEY;
  const apiKey = 'XSrjDAtlsXEX8U2Fgc8py85bgRths7pa';
  // console.log('API Key:', apiKey); // Log the API key for debugging

  if (!apiKey) {
    console.error('API key is not set');
  }
 // Ensure this is set in your .env file
  const client = new Mistral({ apiKey });

  // Fetch weather based on user input city
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = '6e3bbf476831d0197a811f4392171fb9';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      await generatePoetry(response.data); // Generate AI content for the fetched weather
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  const generatePoetry = async (weatherData) => {
    const prompt = `Suggest activities or tasks ideal for a day with ${weatherData.weather[0].description} in ${weatherData.name}. Include creative recommendations that align with the mood of the weather. Additionally, draw a comparison to the weather in a well-known city globally where this weather type is common, describing the sensory experience of being in such conditions—consider sights, sounds, and the feeling of being outdoors`;
    // const prompt = `Describe tasks or activities that are best suited for a day with ${weatherData.weather[0].description} in ${weatherData.name}. Additionally, compare this weather to that of one of the well-known places around the world and explain how it typically feels to experience this type of weather.`;
    try {
      const chatResponse = await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [{ role: 'user', content: prompt }],
      });
      setPoetry(chatResponse.choices[0].message.content); // Extract the generated text
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error("Rate limit exceeded, retrying...");
        setTimeout(() => generatePoetry(weatherData), 60000); // Retry after 1 minute
      } else {
        console.error("Error generating AI content:", error);
        setPoetry("Unable to generate poetry at this time.");
      }
    }
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city); // Fetch weather for the searched city
    }
  };

  return (
  //   <div className='container'>
  //     <h1>Search for Weather</h1>
  //     <form onSubmit={handleSearch}>
        
  //       <input
  //         type="text"
  //         placeholder="Enter city name"
  //         value={city}
  //         onChange={(e) => setCity(e.target.value)}
  //       />
  //       <button type="submit">Search</button>
  //     </form>

  //     {loading && <div>Loading...</div>}
  //     {error && <div>{error}</div>}

  //     {weatherData && (
  //       <div>
  //         <h2>Weather in {weatherData.name}</h2>
  //         <p id='temp'>Temperature: {weatherData.main.temp}°C</p>
  //         <p>Weather: {weatherData.weather[0].description}</p>
  //         <h3>Tasks and what it feels </h3>
  //         <p id='poem'>{poetry}</p>
  //       </div>
  //     )}
  //   </div>
  // );
  <div>
    <div class="container flex flex-row justify-center items-center">
      <div class="container m-3 p-3 basis-1/2">
        <h1 class="text-5xl font-bold">
          ClimaMuse
        </h1>
        <p class="">
          Discover weather with a creative twist
        </p>
      </div>
      <div class="basis-1/2 flex justify-center items-center">
      <form onSubmit={handleSearch} class="w-full max-w-md">
        <div class="flex justify-center items-center ">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            class="p-2 border-2 border-gray-500"
          />
          <button
            type="submit"
            class="p-2 bg-gray-500 border-2 border-gray-500"
          >
            Search
          </button>
        </div>
      </form>
  </div>
  </div>



  {weatherData && (
    <div class="items-center">
       <div className="bg-white/10 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-black mb-4">
           Weather in {weatherData.name}
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-black/80">Temperature</p>
             <p className="text-4xl font-bold text-black">
               {weatherData.main.temp}°C
             </p>
             <p className="text-black/80 capitalize">
              {weatherData.weather[0].description}
             </p>
           </div>
           <div className="bg-white/10 p-4 rounded-lg">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-black/80">Humidity</p>
                 <p className="text-xl font-semibold text-black">
                   {weatherData.main.humidity}%
                </p>
               </div>
               <div>
                 <p className="text-black/80">Wind</p>
                 <p className="text-xl font-semibold text-black">
                   {weatherData.wind.speed} m/s
                 </p>
               </div>
             </div>
           </div>
         </div>
       </div>

      <div class="container p-3">
        <h3 class="text-xl font-semibold text-black mb-4">
          Tasks and what it feels like
        </h3>
        <p class="text-black/90 leading-relaxed whitespace-pre-line">
          {poetry}
        </p>
      </div>
    </div>
  )}

{loading && (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue mx-auto"></div>
      <p className="text-black mt-4">Loading weather data...</p>
    </div>
  )}

  {error && (
    <div className="bg-red-500/20 border border-red-500/50 text-red p-4 rounded-lg">
      {error}
    </div>
  )}
</div>
//   <div className="container">
//   <form onSubmit={handleSearch}>
//     <div className="flex gap-1">
//       <input
//         type="text"
//         placeholder="Enter city name"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         className="flex-1 rounded-lg bg-white/10 border border-white/20 text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
//       />
//       <button
//         type="submit"
//         className=" bg-white/20 hover:bg-white/30 text-black rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
//       >
//         Search
//       </button>
//     </div>
//   </form>



//   {weatherData && (
//     <div className="">
//       <div className="bg-white/10 rounded-lg p-6">
//         <h2 className="text-2xl font-semibold text-black mb-4">
//           Weather in {weatherData.name}
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="bg-white/10 p-4 rounded-lg">
//             <p className="text-4xl font-bold text-black">
//               {weatherData.main.temp}°C
//             </p>
//             <p className="text-black/80 capitalize">
//               {weatherData.weather[0].description}
//             </p>
//           </div>
//           <div className="bg-white/10 p-4 rounded-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-black/80">Humidity</p>
//                 <p className="text-xl font-semibold text-black">
//                   {weatherData.main.humidity}%
//                 </p>
//               </div>
//               <div>
//                 <p className="text-black/80">Wind</p>
//                 <p className="text-xl font-semibold text-black">
//                   {weatherData.wind.speed} m/s
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 rounded-lg p-6">
//         <h3 className="text-xl font-semibold text-black mb-4">
//           Tasks and what it feels like
//         </h3>
//         <p className="text-black/90 leading-relaxed whitespace-pre-line">
//           {poetry}
//         </p>
//       </div>
//     </div>
//   )}

// {loading && (
//     <div className="text-center py-8">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue mx-auto"></div>
//       <p className="text-black mt-4">Loading weather data...</p>
//     </div>
//   )}

//   {error && (
//     <div className="bg-red-500/20 border border-red-500/50 text-red p-4 rounded-lg">
//       {error}
//     </div>
//   )}
// </div>
);
};

export default WeatherComponent;
