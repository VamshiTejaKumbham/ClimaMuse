import { useState } from 'react'
import './index.css'
import WeatherComponent from './WeatherComponent'

function App() {

  return (
  <>    
  {/* <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
  <div className="max-w-4xl mx-auto">
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
        ClimaMuse
      </h1>
      <p className="text-white/80 text-lg">
        Discover weather with a creative twist
      </p>
    </div>
    <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-xl p-6">
    <WeatherComponent/>
    </div>
  </div>
  </div> */}
  
  <div class="container p-8">
    <div class="container m-3 p-3" >
      <WeatherComponent />
    </div>
  </div>
  {/* <div className="container m-0">
  <div className="container">
    <div className="text-center py-12">
      <h1 className="text-5xl font-extrabold text-black mb leading-tight">
        ClimaMuse
      </h1>
      <p className="text-black/90 text-xl">
        Discover weather with a creative twist
      </p>
    </div>
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
      <WeatherComponent />
    </div>
  </div>
</div> */}

  </>
  )
}

export default App;
