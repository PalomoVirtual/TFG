import React from 'react';
import './assets/logo.png';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Comparador from './pages/Comparador';
import { Route } from 'wouter';
import Dashboard from './pages/Dashboard';
import Edificios from './pages/Edificios';
import Notificaciones from './pages/Notificaciones';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Route path="/" component={Dashboard} />
      <Route path="/edificios" component={Edificios} />
      <Route path="/comparador" component={Comparador} />
      <Route path="/notificaciones" component={Notificaciones} />
      {/* <Route path="/tasks/new" component={NewTask} /> */}
      {/* <Route path="/commands/new" component={NewCommand} /> */}
      {/* <Route path="/tasks/assign/:page?">{params => <Assign page={params.page} />}</Route> */}
      {/* <Route path="/pupil/new" component={NewPupil} /> */}
    </div>
  );
}

export default App;
