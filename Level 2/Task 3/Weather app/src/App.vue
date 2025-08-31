<template>
  <div class="weather-bg">
    <div class="weather-card">
      <h1>Weather Dashboard</h1>
      <div class="search-row">
        <input 
          v-model="city"
          @keyup.enter="getCurrentWatcher"
          placeholder="Enter city name"
        />
        <button @click="getCurrentWatcher">Search</button>
      </div>
      <div v-if="weather" class="weather-info">
        <h2>{{ weather.name }}, {{ weather.sys.country }}</h2>
        <div class="weather-main">
          <img 
            :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" 
            :alt="weather.weather[0].description"
          />
          <div>
            <span class="temp">{{ Math.round(weather.main.temp) }}°C</span>
            <p class="desc">{{ weather.weather[0].description }}</p>
          </div>
        </div>
        <div class="weather-details">
          <div>
            <span>Humidity</span>
            <strong>{{ weather.main.humidity }}%</strong>
          </div>
          <div>
            <span>Wind</span>
            <strong>{{ weather.wind.speed }} m/s</strong>
          </div>
          <div>
            <span>Feels Like</span>
            <strong>{{ Math.round(weather.main.feels_like) }}°C</strong>
          </div>
        </div>
      </div>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      city: "",
      weather: null,
      error: null
    }
  },
  methods: {
    async getCurrentWatcher() {
      if(!this.city) return;
      this.error = null;

      try {
        const apiKey = "Replace with your OpenWeatherMap API key in these quotes";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        this.weather = response.data;
      } catch (err) {
        this.weather = null;
        this.error = "City not found. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.weather-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #cbe5ff 0%, #f7faff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.weather-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 2rem 2.5rem;
  max-width: 400px;
  width: 100%;
}
h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2563eb;
  letter-spacing: 1px;
}
.search-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.search-row input {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-size: 1rem;
}
.search-row button {
  padding: 0.6rem 1.2rem;
  border: none;
  background: #2563eb;
  color: #fff;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.search-row button:hover {
  background: #1741a6;
}
.weather-info {
  text-align: center;
  margin-top: 1rem;
}
.weather-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.weather-main img {
  width: 70px;
  height: 70px;
}
.temp {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2563eb;
}
.desc {
  text-transform: capitalize;
  color: #555;
  margin-top: 0.2rem;
}
.weather-details {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  gap: 1rem;
}
.weather-details div {
  background: #f3f6fa;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  flex: 1;
}
.weather-details span {
  display: block;
  color: #888;
  font-size: 0.9rem;
}
.weather-details strong {
  display: block;
  font-size: 1.1rem;
  margin-top: 0.2rem;
  color: #222;
}
.error-msg {
  color: #ef4444;
  text-align: center;
  margin-top: 1.5rem;
  font-weight: 500;
}
</style>
