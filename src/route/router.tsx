import Home from "@/page/dashboard/home";
import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";

const Scaffold = () => {
    return <div>
        <Outlet />
    </div>
}

const RouteProvider = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Scaffold />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes >
        </Router >
    );
};

export default RouteProvider;
