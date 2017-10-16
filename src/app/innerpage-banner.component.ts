import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'inner-banner',
  templateUrl: './innerpage-banner.component.html',
  styles: [`
  .banner {
        background-color: rgba(0, 0, 0, 1);
        background-size: cover;
        padding: 2em 0;
        color: #FFF;
    }
  `]
})
export class InnerBannerComponent implements OnInit {
  constructor() {  }
  @Input('title') title:any;
  @Input('breadcums') breadcums: any;
  ngOnInit() {
  }
}
