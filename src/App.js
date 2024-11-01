import React from "react";
import GlobalStyles from 'styles/GlobalStyles';
import ComponentRenderer from "ComponentRenderer.js";
import { SpeedInsights } from "@vercel/speed-insights/react"
import ThankYouPage from "ThankYouPage.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "Home";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/components/:type/:subtype/:name" element={<ComponentRenderer />} />
          <Route path="/components/:type/:name" element={<ComponentRenderer />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <SpeedInsights />
      </Router>
    </>
  );
}
