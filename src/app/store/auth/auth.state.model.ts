import { ISideBar } from "src/app/interface";

export class AuthModel {
    sideBar: ISideBar[] = [];

    constructor() {
        console.log("Auth Model created >> ", this.sideBar);
    }
}