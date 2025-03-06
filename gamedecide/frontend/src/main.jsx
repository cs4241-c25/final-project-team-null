import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ThemeProvider} from "@mui/material";
import theme from "./theme.js";
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router} from 'react-router-dom';

createRoot(document.getElementById('app-root')).render(
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
              <App />
          </Router>
      </ThemeProvider>
)
