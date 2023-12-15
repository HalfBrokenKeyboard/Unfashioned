import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  arrayData: [1, 2, 3];
  arrayFakeData: any[];

  ngOnInit(): void {
    this.arrayFakeData = [
      { name: 'John Doe', age: 25, city: 'New York', job: 'Web-developer', industry: 'tech' },
      { name: 'Jane Smith', age: 30, city: 'Los Angeles', job: 'Web-developer', industry: 'tech' },
      { name: 'Bob Johnson', age: 28, city: 'Chicago', job: 'Web-developer', industry: 'tech' },
      { name: 'Alice Williams', age: 22, city: 'San Francisco', job: 'Web-developer', industry: 'tech' },
      { name: 'Charlie Brown', age: 35, city: 'Seattle', job: 'Web-developer', industry: 'tech' }
    ];
  }

}
