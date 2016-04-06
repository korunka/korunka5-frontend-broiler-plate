import {bootstrap} from 'angular2/bootstrap';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, PathLocationStrategy} from 'angular2/router';

// Hlavní komponenta Klientské aplikace
import {ClientAppComponent} from './client-app.component';


bootstrap(ClientAppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: PathLocationStrategy})
]).catch(err=>console.error(err));