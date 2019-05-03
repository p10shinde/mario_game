import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  public generateMushroomPositions(rows: number, cols: number) {

    function getRandom() {
    return Math.floor(Math.random() * rows * cols);
    }

    const posList = [];

    while (posList.length < rows) {
        const nm = getRandom();
        if (posList.indexOf(nm) === -1) {
            posList.push(nm);
        }
    }
    return posList;
  }
}

// amit.gore@gianview.in
