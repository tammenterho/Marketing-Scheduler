import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
})

// oninit implementointi mahdollistaa ngOninititn käytön
export class AddButtonComponent implements OnInit {
  @Input() text!: string; // saadaan text ja color add-campaign-componentista, joka on parent
  @Input() color!: string; // saadaan text ja color add-campaign-componentista, joka on parent
  @Output() btnClick = new EventEmitter(); //klikkaus lähetetään eteenpäin parentille

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    // metodi tässä html:ssä on onclick() tietty
    this.btnClick.emit(); // otetaan talteen klikkausu event lähetystä varten
  }
}
