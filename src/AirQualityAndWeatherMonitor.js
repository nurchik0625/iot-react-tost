import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const AirQualityAndWeatherMonitor = () => {
  const [city, setCity] = useState('Бишкек');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e9cc91c43499eab0de3837377f52231d&lang=RU&units=metric`);
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      console.error('Ошибка при получении данных о погоде:', error);
      setError('Город не найден. Пожалуйста, повторите попытку.');
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleSearch = () => {
    fetchWeatherData();
  };

  const getChartData = () => {
    if (!weatherData) return null;
  
    const labels = [];
    const temperatureData = [];
    const humidityData = [];
    const windSpeedData = [];
  
    weatherData.list.forEach(item => {
      labels.push(item.dt_txt);
      temperatureData.push(item.main.temp);
      humidityData.push(item.main.humidity);
      windSpeedData.push(item.wind.speed);
    });
  
    return {
      labels: labels,
      datasets: [
        {
          label: 'Температура',
          data: temperatureData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Влажность',
          data: humidityData,
          fill: false,
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1
        },
        {
          label: 'Скорость ветра',
          data: windSpeedData,
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    };
  };

  return (
    <div>
      <h1>Качество Воздуха и Мониторинг Погоды</h1>
      <div>
        <input 
          type="text"
          placeholder="Введите название города"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Поиск</button>
      </div>
      {error && <p>{error}</p>}
      {weatherData && (
        <Line data={getChartData()} />
      )}
    </div>
  );
};

export default AirQualityAndWeatherMonitor;
