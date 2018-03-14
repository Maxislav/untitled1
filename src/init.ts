import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppModule} from "./app/app.module";

if (process.env.ENV !== 'dev') {
    enableProdMode();
}

class A {
    value: string
    constructor(n: string){
        this.value = n
    }
}

const a = new A('oloe')

console.log(a.value)


export function main() {
    return platformBrowserDynamic().bootstrapModule(AppModule);
}


if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}