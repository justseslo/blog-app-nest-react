import { useState } from "react";
import "./App.css";
import { BrowserRouter, Router } from "react-router";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
