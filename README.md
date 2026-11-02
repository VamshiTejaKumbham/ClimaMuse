# ClimaMuse

ClimaMuse is a weather-inspired web app that helps users explore the current weather in any city and turns those conditions into creative, personalized suggestions for the day.

Built with React and Vite, the app combines live weather data from OpenWeatherMap with Mistral AI to generate activity ideas, mood-based recommendations, and a more engaging weather experience.

## Features

- Search weather conditions by city name
- View temperature, humidity, wind speed, and current conditions
- Get AI-generated activity suggestions based on the weather
- Responsive and modern interface using React + Tailwind CSS
- Loading and error handling for smoother user experience

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Axios
- OpenWeatherMap API
- Mistral AI SDK

## Project Structure

```text
ClimaMuse/
├── public/
├── src/
│   ├── App.jsx
│   ├── WeatherComponent.jsx
│   ├── main.jsx
│   ├── index.css
│   └── assets/
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.cjs
├── eslint.config.js
└── README.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the root directory and add your API keys:

```env
VITE_WEATHER_API_KEY=your_openweather_api_key
VITE_AI_API_KEY=your_mistral_api_key
```

### 3. Run the app locally

```bash
npm run dev
```

The app will start in development mode and can be opened in your browser at the local Vite URL.

## Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Notes

- The weather data is fetched from OpenWeatherMap using `VITE_WEATHER_API_KEY`.
- The AI-based recommendations are generated through Mistral using `VITE_AI_API_KEY`.
- This project was scaffolded with Vite and customized for a weather + creativity experience.

## License

This project is currently unlicensed.
