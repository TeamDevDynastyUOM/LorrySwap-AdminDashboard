import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Driver from "./scenes/driver";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Profile from "./scenes/profile";
import CargoRide from "./scenes/cargo_ride";
import ECSeller from "./scenes/ECSeller";
import CargoFinder from "./scenes/cargoFinder";
import EC_seller_profile from "./scenes/ecSellerProfile";
import Vehicle from "./scenes/vehicle";
import CargoFinderProfile from "./scenes/cargoFinderProfile";
import FeedBack from "./scenes/feedback";
import CargoRidesHistory from "./scenes/cargo_rides_history";
import Footer from "./scenes/global/Footer"; 
import DriverRide from "./scenes/driver_ride";
import Form from "./scenes/form";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/form" element={<Form />} />
              <Route path="/team" element={<Team />} />
              <Route path="/cargoFinder" element={<CargoFinder />} />
              <Route path="/driver" element={<Driver />} />
              <Route path="/ECSeller" element={<ECSeller />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/ecSellerProfile/:id" element={<EC_seller_profile />} />
              <Route path="/cargo_ride" element={<CargoRide />} />
              <Route path="/feedback" element={<FeedBack />} />
              <Route path="/vehicle" element={<Vehicle />} />
              <Route path="/driver_ride" element={<DriverRide />} />
              <Route path="/cargo_rides_history" element={<CargoRidesHistory />} />
              <Route path="/cargoFinderProfile/:id" element={<CargoFinderProfile />} />

              

            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
       
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
