import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BulkEmail from "./pages/BulkEmail";

const Home = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <h2>Welcome to Bulk Email Sender</h2>
    <Link to="/bulk-email">
      <button>Go to Bulk Email Page</button>
    </Link>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bulk-email" element={<BulkEmail />} />
      </Routes>
    </Router>
  );
};

export default App;
