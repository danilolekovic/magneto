/*
 *  ' test.js '
 *
 *      test prototype class
 */


export class Test {
    constructor(left, right, name) {
        this.left = left;
        this.right = right;
        this.name = name;
    }

    run() {}

    print(msg) {
        console.log("[MAGNETO] [" + this.name + "] *TEST* " + msg);
    }
};