import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    constructor() {
    }

    setMyColor(hex: string) {
        document.documentElement.style.setProperty(`--my-color`, hex);
    }
}
