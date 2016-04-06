import {Component} from 'angular2/core';
import {RouteConfig, Route, ROUTER_DIRECTIVES} from 'angular2/router';
import {HomeComponent} from './components/Home/home.component';
import {PageComponent} from './components/Page/page.component';
import {BetComponent} from './components/Bet/bet.component';
import {ProfileComponent} from './components/Profile/profile.component';
import {NavigationComponent} from './components/Navigation/navigation.component';



@Component({
  selector: 'client-app',
  directives: [NavigationComponent, ROUTER_DIRECTIVES],
  template: `
<div class="container">
<h1>Korunka Client App</h1>
<navigation></navigation>
<router-outlet></router-outlet>
</div>
`
})
@RouteConfig([
  new Route({path: '/',       name: 'Home',    component: HomeComponent, useAsDefault: true}),
  new Route({path: '/:key',   name: 'Page',    component: PageComponent}),
  new Route({path: '/vsadit', name: 'Bet',     component: BetComponent}),
  new Route({path: '/profil', name: 'Profile', component: ProfileComponent}),
])
export class ClientAppComponent {

  constructor() {
  }

}