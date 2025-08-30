import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-100">
        <Link to="/calendar" className="text-blue-600">Calendar</Link>
      </nav>
      <Routes>
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
