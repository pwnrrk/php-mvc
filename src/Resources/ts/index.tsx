import "../css/index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";

const client = new ApolloClient({
    uri: import.meta.env.PROD
        ? import.meta.env.BASE_URL + "/graphql"
        : "/graphql",
    cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </BrowserRouter>
    </StrictMode>
);
