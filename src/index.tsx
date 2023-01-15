import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router/Router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const container = document.getElementById("root");

const root = ReactDOM.createRoot(container as Element);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </React.StrictMode>
);
