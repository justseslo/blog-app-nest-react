import { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router";
import AppRouter from "./routes/AppRouter";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { checkToken } from "./features/auth/slice/auth.slice";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkToken());
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
