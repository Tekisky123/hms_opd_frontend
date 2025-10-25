import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL || '/api' 
  baseURL:"https://hms-opd-backend-v1.vercel.app/api",
  headers: {
    'Content-Type': 'application/json',
  },
})


// Add a request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      // Correct way: mutate headers, don’t replace
      config.headers.set
        ? config.headers.set("Authorization", `Bearer ${token}`)
        : (config.headers["Authorization"] = `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor to add token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token') 
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//       window.location.href = '/'
//     }
//     return Promise.reject(error)
//   }
// )

export default api
