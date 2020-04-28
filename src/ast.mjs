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

export class Let extends Node {
    constructor(id, value) {
        super("Let Statement");
        this.id = id;
        this.value = value.generate();
    }

    generate() {
        return "var " = this.id + " = " + this.value + ";";
    }
};

export class BinaryOperator extends Node {
    constructor(left, operator, right) {
        super("Binary Operator");
        this.left = left.generate();
        this.operator = operator;
        this.right = right.generate();
    }

    generate() {
        return this.left + " " + this.operator + " " + this.right;
    }
};

export class String extends Node {
    constructor(value) {
        super("String Literal");
        this.value = value;
    }

    generate() {
        return "\"" + this.value +  "\"";
    }
}

export class Boolean extends Node {
    constructor(value) {
        super("Boolean Literal");
        this.value = value;
    }

    generate() {
        return this.value;
    }
}

export class Nil extends Node {
    constructor() {
        super("Nil Literal");
    }

    generate() {
        return "null";
    }
}