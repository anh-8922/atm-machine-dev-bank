import { Route, Routes } from "react-router-dom";
import Landing from "./Components/LandingPage";
import ATMApp from "./Components/PinAuthentication";

export default function AllRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="enter-pin" element={<ATMApp/>} />
           
        </Routes>
    )
}