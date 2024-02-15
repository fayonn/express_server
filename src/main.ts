import { App } from './app';
import { AppContainer } from './container/app-container';
import { DEPENDENCY_TYPE } from './container/dependency-type';

const appContainer = new AppContainer();
const app = appContainer.get<App>(DEPENDENCY_TYPE.Application);
app.init();

export { app, appContainer };
