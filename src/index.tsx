import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import ro from "./locales/ro/common.json";
import en from "./locales/en/common.json";

const rootElement = document.getElementById("root");

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: sessionStorage.getItem("lang") || 'en',                              // language to use
  resources: {
    en: {
      common: en               // 'common' is our custom namespace
    },
    ro: {
      common: ro
    },
  },
});


ReactDOM.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>,
  rootElement
);
