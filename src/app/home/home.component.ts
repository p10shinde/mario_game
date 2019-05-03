import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { GeneralService } from '../general.service';
import * as $ from 'jquery';

export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  UP_ARROW = 'ArrowUp',
  DOWN_ARROW = 'ArrowDown'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, AfterViewInit  {
  cols: number;
  rows: number;
  totalGrid: number[];
  mushroomCount: number;
  mushroomPositions: number[];
  keypressed;
  globalInterval;
  currentPos = 0;
  rchdLeftEnd = true;
  rchdRightEnd = false;
  rchdBottomEnd = true;
  rchdTopEnd = false;
  stepCounter = 0;
  mushroomFound = 0;
  gameComplete = false;
  invalidInput = false;

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keypressed = event.key;
    if (event.key === KEY_CODE.UP_ARROW) {
      this.handleMarioAtInterval('up');
    }

    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.handleMarioAtInterval('right');
    }

    if (event.key === KEY_CODE.DOWN_ARROW) {
      this.handleMarioAtInterval('down');
    }

    if (event.key === KEY_CODE.LEFT_ARROW) {
      this.handleMarioAtInterval('left');
    }
  }
  constructor( private gS: GeneralService) { }

  handleMarioAtInterval(direction: string) {
    if (this.globalInterval) {
      clearInterval(this.globalInterval);
    }
    this.globalInterval = setInterval( () => {
      if (direction === 'up' || direction === 'down') {
        if (this.currentPos <= (this.cols * (this.rows - 1)) && !this.rchdTopEnd) {
          $('.mario').hide();
          this.currentPos = this.currentPos +  this.cols;
          $($('.mario')[this.currentPos]).show();
          if (this.currentPos >= (this.cols * (this.rows - 1)) && this.currentPos < (this.cols * this.rows)) {
            this.rchdBottomEnd = false;
            this.rchdTopEnd = true;
          }
          this.stepCounter = this.stepCounter + 1;
          if ($($('mat-grid-tile')[this.currentPos]).find('img.mushroom').hasClass('hid')) {
            $($('mat-grid-tile')[this.currentPos]).find('img.mushroom').removeClass('hid');
            this.mushroomFound++;
            this.checkIfGameComplete();
          }
        } else {
          $('.mario').hide();
          this.currentPos = this.currentPos -  this.cols;
          $($('.mario')[this.currentPos]).show();
          if (this.currentPos >= 0 && this.currentPos < this.cols) {
            this.rchdTopEnd = false;
            this.rchdBottomEnd = true;
          }
          this.stepCounter = this.stepCounter + 1;
          console.log($($('mat-grid-tile')[this.currentPos]).find('img.mushroom').hasClass('hid'));
          if ($($('mat-grid-tile')[this.currentPos]).find('img.mushroom').hasClass('hid')) {
            $($('mat-grid-tile')[this.currentPos]).find('img.mushroom').removeClass('hid');
            this.mushroomFound++;
            this.checkIfGameComplete();
          }
        }
      }

      if (direction === 'right' || direction === 'left') {
        if ((this.currentPos % this.cols) <= this.cols && !this.rchdLeftEnd) {
          $('.mario').hide();
          this.currentPos = this.currentPos - 1;
          $($('.mario')[this.currentPos]).show();
          if (this.currentPos % this.cols === 0) {
            this.rchdLeftEnd = true;
            this.rchdRightEnd = false;
          }
          this.stepCounter = this.stepCounter + 1;
          console.log($($('mat-grid-tile')[this.currentPos]).find('img.mushroom').hasClass('hid'));
          if ($($('mat-grid-tile')[this.currentPos]).find('img.mushroom').hasClass('hid')) {
            $($('mat-grid-tile')[this.currentPos]).find('img.mushroom').removeClass('hid');
            this.mushroomFound++;
            this.checkIfGameComplete();
          }
        } else {
          $('.mario').hide();
          this.currentPos = this.currentPos + 1;
          $($('.mario')[this.currentPos]).show();
          if ((this.currentPos + 1) % this.cols === 0 ) {
            this.rchdRightEnd = true;
            this.rchdLeftEnd = false;
          }
          this.stepCounter = this.stepCounter + 1;
          console.log($($('mat-grid-tile')[this.currentPos]).find('img.mushroom').hasClass('hid'));
          if ($($('mat-grid-tile')[this.currentPos]).find('img.mushroom').hasClass('hid')) {
            $($('mat-grid-tile')[this.currentPos]).find('img.mushroom').removeClass('hid');
            this.mushroomFound++;
            this.checkIfGameComplete();
          }
        }
      }
    }, 500);
  }


  checkIfGameComplete() {
    console.log('Count : ' + this.mushroomFound);
    if (this.mushroomFound === this.rows) {
      clearInterval(this.globalInterval);
      this.gameComplete = true;
    }
  }

  restartGame() {
    this.gameComplete = false;
    window.location.reload();
  }

  receiveButtonClickFromVictory($event) {
    console.log($event);
    if ($event === 'ok') {

    } else if ($event === 'restart') {
      this.restartGame();
    }
  }

  determinePos(i: number) {
    if (i === this.currentPos) {
      return true;
    } else if (i === Math.ceil(this.currentPos / this.rows)) {
      return true;
    }

    return false;
  }

  getMatrix(rows: number, cols: number) {
    const posObj = [];
    for ( let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            posObj.push({x: i, y : j});
        }
    }
    return posObj;
  }

  ngOnInit() {
    this.rows = Number(prompt('Enter number of rows? (rows < 11)'));
    this.cols = Number(prompt('Enter number of cols? (cols < 11)'));
    if (this.rows > 0 && this.rows <= 10 && this.cols > 0 && this.cols <= 10 && !isNaN(this.rows) && !isNaN(this.cols)) {
      this.mushroomCount = this.rows;
      this.totalGrid = this.getMatrix(this.rows, this.cols);
      this.mushroomPositions = this.gS.generateMushroomPositions(this.rows, this.cols);
    } else {
      this.invalidInput = true;
    }
  }

  ngAfterViewInit() {
    $($('.mario')[0]).show();
  }

}
