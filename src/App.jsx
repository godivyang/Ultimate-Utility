import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import BusyIndicator from './component/BusyIndicator';
import HomePage from './app/HomePage';

const App = () => {
  const [busyDialogVisible, setBusyDialogVisible] = useState(false);
  return (
  <div className="App">
    <BusyIndicator show={busyDialogVisible}/>
    <header className="App-header">
      <Routes>
        <Route path="/" element={<HomePage showBusyIndicator={setBusyDialogVisible}/>}/>
      </Routes>
    </header>
  </div>);
};

export default App;