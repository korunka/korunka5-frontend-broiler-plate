import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
  selector: 'page',
  template: require('./page.component.html'),
  styles: [require('./page.component.scss')]
})
export class PageComponent implements OnInit {
  pageKey: string;

  constructor(private routeParams: RouteParams) {
  }

  ngOnInit(): any {
    this.pageKey = this.routeParams.get('key');
  }

}