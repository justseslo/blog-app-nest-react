import { useState } from "react";
import "./App.css";
import AppRoute from "./routes/AppRoute";
import { BrowserRouter, Router } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
