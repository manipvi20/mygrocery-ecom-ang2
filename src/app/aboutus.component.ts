import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'about-us',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutUsComponent implements OnInit {
  constructor() {  }
  title : string = "About Us";
  ngOnInit() {
  }
}
