import {Component} from 'angular2/core';

@Component({
  selector: 'homepage',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')]
})
export class HomeComponent {

  constructor() {
  }
  
}