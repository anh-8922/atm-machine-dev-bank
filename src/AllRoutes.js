import { Route, Routes } from "react-router-dom";
import Landing from "./Components/LandingPage";
import PinAuthentication from "./Components/PinAuthentication";
import TransactionTypes from "./Components/TransactionTypes";
import AmountOptions from "./Components/CashWithdrawals";

export default function AllRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="enter-pin" element={<PinAuthentication/>} />
            <Route path="user/transaction-types" element={<TransactionTypes/>} />
            <Route path="user/transaction-types/cash-withdrawals" element={<AmountOptions/>} />
        </Routes>
    )
}