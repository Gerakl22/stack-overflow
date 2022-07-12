import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';

export function atLeastOneCheckboxCheckedValidator(min: number = 1): ValidatorFn {
  return (formArray: AbstractControl) => {
    if (formArray instanceof FormArray) {
      const totalSelected = formArray.controls
        .map((control: AbstractControl) => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);

      return totalSelected >= min ? null : { required: true };
    }
    throw new Error('formArray is not an instance of FormArray');
  };
}
