import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import {BASE_URL} from './constants.js'

if(import.meta.env.VITE_ENV == "dev"){
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.withCredentials = true;
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
