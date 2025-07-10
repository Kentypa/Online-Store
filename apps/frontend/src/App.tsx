import { PopupList } from "@overlays/PopupsList";
import { ApplicationRoutes } from "@screens/ApplicationRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { store } from "./shared/stores/store";
import "@interceptors/authRefresh";
import "@i18n/i18n";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ApplicationRoutes />
          <PopupList />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
