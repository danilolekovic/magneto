/*
 *  ' diagnosis.js '
 *
 *      error handling; need this to be smart..
 */

 export class Diagnostic {
    constructor(location, message) {
        this.location = location;
        this.message = message;
    }

    toString() {
        return this.message + " at line #" + this.location.line + " (" + this.location.col + ")";
    }
 };

 export class Location {
     constructor(line, col) {
         this.line = line;
         this.col = col;
     }
 }