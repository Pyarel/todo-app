import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
//platformBrowserDynamic renders the application in the browser. It returns an object and we call a function on the object i.e  bootstrapModule(AppModule) and we pass the app.module.ts
//The bootstrap array in the app.module.ts contains the component index.html should execute
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
