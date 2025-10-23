import { Routes, Route } from "react-router-dom";
import Login from "../screens/Login/Login";
import Profile from "../screens/Profile/Profile";
import Pokedex from "../screens/Pokedex/Pokedex";

export function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/pokedex" element={<Pokedex />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
