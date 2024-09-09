import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import RouteProvider from "./route/router";
import { persistor, store } from "./app/state/store";
import "./asset/style/index.css";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api.bettermode.com",
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <PersistGate loading={null} persistor={persistor}>
                    <RouteProvider />
                </PersistGate>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>
);
