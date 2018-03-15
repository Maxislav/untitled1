import { Component as AngularComponent } from "@angular/core";


export  const  Component = (a) => {
    a.styleUrls = a.styleUrls.map(it=>it.replace(/\.sass$/, '.css'))
    return AngularComponent(a)
}

