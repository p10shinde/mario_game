import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-victory',
  templateUrl: './victory.component.html',
  styleUrls: ['./victory.component.less']
})
export class VictoryComponent implements OnInit {
  @Input() stepCounter: number;

  @Output() event = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  okbutton() {
    this.event.emit('ok');
  }

  restartbutton() {
    this.event.emit('restart');
  }


}
