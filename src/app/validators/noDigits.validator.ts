import { FormControl } from '@angular/forms';

export class MyValidators {
    cityNameValidator(control: FormControl): {
        [s: string]: boolean;
    } {
        const accountRgEx: RegExp = /^\D+$/i;
        const valid = accountRgEx.test(control.value);
        return valid ? null : { city: true };
    }
}


