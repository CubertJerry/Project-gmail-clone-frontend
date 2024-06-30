import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}` // Include token if using JWT
  }
});

export default api;