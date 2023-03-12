## Module structure

```bash
src/modules/Sample/
├── bootstraps.ts
├── config
│   └── constants.ts
├── pages
│   └── SamplePage.tsx
├── reducers
│   └── sample.ts
└── services
    └── sample.ts
```

bootstraps.ts

```javascript
import { ModuleConfig } from "@core/interfaces";
import { name as sample } from "@modules/Sample/reducers/sample";

const config: ModuleConfig = {
  name: "Sample", // name of the folder module
  baseUrl: "/sample", // base url
  routes: [
    {
      path: "/sample-page", // url of the page => http://example.com/sample/sample-page
      page: "SamplePage", // name of the file in pages folder
      title: "Sample Page", // title of the page
      exact: true, // config exact in Route of react-router-dom
      reducer: {
        // reducer config, single or array
        name: sample, // name of state in store
        resource: "sample", // name of the file in folder reducer
      },
    },
  ],
  requireAuthenticated: false, // need login to access page or not. If value = "any", login or not login both can access
};

export default config;
```

config/constants.ts

```javascript
export const namespace = "namespace:sample"; // define namespace of module
```

reducers/sample.ts

```javascript
import { Action } from "redux";

interface SampleState {}

const initialState: SampleState = {};

export const name = `${namespace}_sample`; // name of state in store, concat with namespace to prevent conflict state name with other namespace
export default function sample(
  state: SampleState = initialState,
  action: Action<string>,
) {
  switch (action.type) {
    default:
      return state;
  }
}
```

services/sample.ts

```javascript
import BaseService from "@core/class/BaseService";
import { Object } from "@core/interfaces";

class SampleService extends BaseService {
  // need to extends BaseService

  list = (body: Object<string>) => {
    return this.get("/sample", body);
  };
}

export default new SampleService("/api", false);
```

[Pokémon API](https://pokeapi.co/) React application

## Available Scripts

In the project directory, you can run:

### `yarn add node-sass`

### `yarn`

### `yarn run start:dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# [The Star Wars API](https://swapi.dev) Vue.js application

### `yarn run lint`

Lints files
