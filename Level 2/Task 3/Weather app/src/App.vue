<template>
  <div class="weather-app">
    <div class="weather-header">
      <h1>Weather Dashboard</h1>
      <p>Get real-time weather updates</p>
    </div>
    
    <div class="search-container">
      <input 
        type="text"
        v-model="city"
        placeholder="Enter city name..."
        @keyup.enter="getCurrentWatcher"
        class="search-input"
      />
      <button @click="getCurrentWatcher" class="search-btn">
        <span>Search</span>
      </button>
    </div>

    <div v-if="weather" class="weather-card">
      <div class="location">
        <h2>{{ weather.name }}, {{ weather.sys.country }}</h2>
        <p class="weather-desc">{{ weather.weather[0].description }}</p>
      </div>
      
      <div class="weather-main">
        <div class="temp-display">
          <p class="temperature">{{ Math.round(weather.main.temp) }}°C</p>
          <img 
            :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" 
            :alt="weather.weather[0].description"
            class="weather-icon"
          >
        </div>
        
        <div class="weather-details">
          <div class="detail-item">
            <span class="detail-label">Humidity</span>
            <span class="detail-value">{{ weather.main.humidity }}%</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Wind</span>
            <span class="detail-value">{{ weather.wind.speed }} m/s</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Feels Like</span>
            <span class="detail-value">{{ Math.round(weather.main.feels_like) }}°C</span>
          </div>
        </div>
      </div>
    </div>

    <p v-if="error" class="error-message">{{ error }}</p>
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
        const apiKey = "Replace with own openweathermap API key";
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
/* Color Variables */
:root {
  --codveda-blue: #2563eb;
  --codveda-teal: #14b8a6;
  --codveda-dark: #1e293b;
  --codveda-light: #f8fafc;
  --codveda-gray: #94a3b8;
  --codveda-error: #ef4444;
}

/* Base Styles */
.weather-app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.weather-header {
  text-align: center;
  margin-bottom: 2rem;
}

.weather-header h1 {
  color: var(--codveda-blue);
  margin-bottom: 0.5rem;
}

.weather-header p {
  color: var(--codveda-gray);
}

/* Search Component */
.search-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 2px solid var(--codveda-gray);
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--codveda-blue);
}

.search-btn {
  background: var(--codveda-blue);
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #1d4ed8;
}

/* Weather Card */
.weather-card {
  background: var(--codveda-light);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.location {
  text-align: center;
  margin-bottom: 1.5rem;
}

.location h2 {
  color: var(--codveda-dark);
  margin-bottom: 0.5rem;
}

.weather-desc {
  color: var(--codveda-gray);
  text-transform: capitalize;
}

/* Main Weather Display */
.weather-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.temp-display {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.temperature {
  font-size: 3rem;
  font-weight: 600;
  color: var(--codveda-blue);
  margin-right: 1rem;
}

.weather-icon {
  width: 80px;
  height: 80px;
}

/* Weather Details */
.weather-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
}

.detail-item {
  background: white;
  padding: 0.8rem;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.detail-label {
  display: block;
  font-size: 0.8rem;
  color: var(--codveda-gray);
  margin-bottom: 0.3rem;
}

.detail-value {
  font-weight: 600;
  color: var(--codveda-dark);
}

/* Error Message */
.error-message {
  color: var(--codveda-error);
  text-align: center;
  margin-top: 1rem;
  padding: 0.8rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 6px;
}
</style>
