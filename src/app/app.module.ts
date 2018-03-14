import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./component/app.component";
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NoopInterceptor} from "./HttpInterceptor";
// import { removeNgStyles, createNewHosts } from '@angularclass/hmr';



@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: NoopInterceptor,
        multi: true,
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }

}