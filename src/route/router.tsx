import LoginPage from "@/page/auth/loginPage";
import Home from "@/page/dashboard/home";
import Scaffold from "@/page/layout/Scaffold";
import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";





const RouteProvider = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Scaffold />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>
            </Routes >
        </Router >
    );
};

export default RouteProvider;
