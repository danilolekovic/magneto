/*
 *  ' token.js '
 *
 *      tokens for lexer
 */

 export class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    display() {
        return "(" + this.type + ", " + this.value + ")";
    }
 };

 export let TokenType = {
    IDENT: "Identifier",
    DIGIT: "Digit",
    IF: "If",
    ELSE: "Else",
    ELSIF: "Else If",
    LET: "Let",
    DEF: "Definition",
    LPAREN: "Left Parenthesis",
    RPAREN: "Right Parenthesis",
    EQ: "Equal To",
    NEQ: "Not Equal To",
    LT: "Less Than",
    GT: "Greater Than",
    LTE: "Less Than / Equal To",
    GTE: "Greater Than / Equal To",
    ADD: "Add",
    SUB: "Subtract",
    MUL: "Multiply",
    DIV: "Divide",
    QUOTE: "\"",
    NEWLINE: "\n",
    WS: "Whitespace",
    EOF: "End of File"
 };