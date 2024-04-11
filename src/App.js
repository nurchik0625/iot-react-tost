import './App.css';
import AirQualityAndWeatherMonitor from './AirQualityAndWeatherMonitor'; // Импортируем наш компонент
import WeatherMap from './components/WeatherMap'; // Импортируем наш компонент

function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/* <AirQualityAndWeatherMonitor /> 
        <h4>Карта</h4> */}
        <WeatherMap />
      </header>
    </div>
  );
}

export default App;
