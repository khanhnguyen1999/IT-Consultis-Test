import Routes from "@core/components/Init/Routes";
import { defaultResource } from "@core/constants/resource";
import configureStore from "@store/configureStore";
import LocaleContext from "@utils/contexts/Locale";
import ResourceContext from "@utils/contexts/Resource";
import Resource from "@utils/helpers/resource";
import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";


export const [store, persistor] = configureStore();

const App = () => {
  const [resource, setResource] = useState(defaultResource);
  const [locale, setLocale] = useState(localStorage.getItem("lang") || "en");
  const history = useHistory();
  const location = useLocation();

  const authenticated = false;
  const resetRoutes = () => {
    setPageContext();
    setResourceContext();
    store.runSaga([]);
  };
  useEffect(() => {
    resetRoutes();
  }, [authenticated]);

  const setResourceContext = () => {
    return Resource.init(authenticated).then((resource) => {
      setResource(resource);
    });
  };

  const setPageContext = () => {
    const isLoginPage = location.pathname.includes("/login");
    if (authenticated && isLoginPage) return history.push("/");

    if (!authenticated) return history.push("/");
  };

  const setLocaleContext = (locale: string) => {
    setLocale(locale);
  };
  return resource.initiated ? (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <IntlProvider
            locale={locale}
            messages={resource.message[locale]}
            onError={(e) => console.log(e)}
          >
            <ResourceContext.Provider value={{ resource, setResourceContext }}>
              <LocaleContext.Provider value={{ locale, setLocaleContext }}>
                <div className="app">
                  <Routes
                    routes={resource.routes}
                    authenticated={resource.authenticated}
                  />
                </div>
              </LocaleContext.Provider>
            </ResourceContext.Provider>
          </IntlProvider>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  ) : (
    <div>Loading...</div>
  );
};

export default App;
