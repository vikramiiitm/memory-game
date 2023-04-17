import { BrowserRouter, Routes, Route } from "react-router-dom";

import Box from './components/pages/Box';
import LandingPage from './components/pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/play" element={<Box />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
