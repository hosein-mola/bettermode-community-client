import client from "@/app/api/graphql/client";
import LoginPage from "@/page/auth/loginPage";
import LoginRedirect from "@/page/auth/loginRedirect";
import PrivateRoute from "@/page/auth/privateRoute";
import Home from "@/page/dashboard/home";
import Scaffold from "@/page/layout/Scaffold";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";



const RouteProvider = () => {
    return (
        <Router>
            <ApolloProvider client={client}>
                <Routes>
                    <Route element={<Scaffold />}>
                        <Route path="/" element={<PrivateRoute element={<Home />} />} />
                        <Route path="/login" element={<LoginRedirect element={<LoginPage />} />} />
                    </Route>
                </Routes >
            </ApolloProvider>
        </Router >
    );
};

export default RouteProvider;
