/*
 *  ' ast.js '
 *
 *      abstract syntax tree
 */

export class Node {
    constructor(name) {
        this.name = name;
    }

    generate() { return ""; }
};