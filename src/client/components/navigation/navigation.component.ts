import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';



@Component({
  selector: 'navigation',
  directives: [ROUTER_DIRECTIVES],
  styles: [require('./navigation.component.scss')],
  template: `
<nav class="navigation">
  <ul>
    <li><a [routerLink]="['/Home']">Home</a></li>
    <li><a [routerLink]="['/Page', {key:'velka-hra'}]">Velká hra</a></li>
    <li><a [routerLink]="['/Bet']">Vsadit</a></li>
    <li><a [routerLink]="['/Profile']">Moje konto</a></li>
  </ul>
</nav>
  `
})
export class NavigationComponent {
}