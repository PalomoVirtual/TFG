import React, { useState } from 'react';
import './assets/logo.png';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Comparador from './pages/Comparador';
import { Route } from 'wouter';
import Dashboard from './pages/Dashboard';
import Edificios from './pages/Edificios';
import Notificaciones from './pages/Notificaciones';

export const EdificiosContext = React.createContext();

function App() {
  const [edificios, setEdificios] = useState([]);
  
  return (
    
    <div className="App verticalContainer">
        <EdificiosContext.Provider value={{edificios, setEdificios}}>
          <NavigationBar />
          <Route path="/" component={Dashboard} />
          <Route path="/edificios" component={Edificios} />
          <Route path="/comparador" component={Comparador} />
          <Route path="/notificaciones" component={Notificaciones} />
        </EdificiosContext.Provider>
      </div>
  );
}

export default App;
