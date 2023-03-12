import { ModuleConfig } from "@core/interfaces";
import { name as pokemons } from "./reducers/pokemons";

const config: ModuleConfig = {
  name: "Home",
  baseUrl: "/",
  routes: [
    {
      path: "/",
      page: "MainPage",
      title: "Home",
      exact: true,
      reducer: {
        name: pokemons,
        resource: "pokemons",
      },
    },
  ],
  requireAuthenticated: false,
};

export default config;
