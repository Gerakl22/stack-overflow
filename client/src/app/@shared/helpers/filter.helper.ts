import { FormArray, FormControl } from '@angular/forms';

export class FilterHelper {
  static setDataForFormArray(array: Array<any>, formArray: FormArray, value: string): void {
    array.map((item) => {
      if (item.value === value) {
        formArray.push(new FormControl(true));
      } else {
        formArray.push(new FormControl(false));
      }
    });
  }

  static updateCheckBoxesForFormArray(array: Array<any>, formArray: FormArray, value: string): void {
    let newArray = [];

    array.map((item) => {
      if (item.value === value) {
        newArray.push(true);
      } else {
        newArray.push(false);
      }
    });

    formArray.setValue(newArray);
  }
}
