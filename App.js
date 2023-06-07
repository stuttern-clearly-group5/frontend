import React from 'react';

import { AuthProvider } from './assets/components/authentication/Context';
import AppNav from './assets/components/Navigation/AppNav';

import { ThemeProvider } from  './assets/components/MainApp/ThemeContext';

export default function App() {
  return (
     <AuthProvider>
    <ThemeProvider>
   
    <AppNav/>
    
    </ThemeProvider>
    </AuthProvider>
  );
}

