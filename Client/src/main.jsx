import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="624108457637-dvcrjphjehd2ou55audo53m8n3lpqet1.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>;
    <ToastContainer />
  </React.StrictMode>,
)
