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
    CONSTANT: "Constant",
    TRUE: "True",
    FALSE: "False",
    COMB_COMP: "Combined Comparison", // todo
    AND: "And",
    OR: "Or",
    AND_BIT: "And Bitwise",
    OR_BIT: "Or Bitwise",
    CARET: "Caret",
    NIL: "Nil",
    END: "End",
    WHILE: "While",
    DO: "Do",
    IN: "In",
    FOR: "For",
    CASE: "Case",
    WHEN: "When",
    BEGIN: "Begin",
    RAISE: "Raise",
    RESCUE: "Rescue",
    ENSURE: "Ensure",
    CLASS: "Class",
    INCLUDE: "Include",
    EXTEND: "Extend",
    MODULE: "Module",
    AT: "At",
    SELF: "Self",
    COMMENT: "Comment",
    LSTREAM: "Left Stream",
    DOT: "Dot",
    LPAREN: "Left Parenthesis",
    RPAREN: "Right Parenthesis",
    LBRACK: "Left Bracket",
    RBRACK: "Right Bracket",
    LCURL: "Left Curly Brace",
    RCURL: "Right Curly Brace",
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
    POW: "Power", // todo
    MOD: "Modulus",
    QUOTE: "\"",
    NEWLINE: "\n",
    WS: "Whitespace",
    EOF: "End of File"
 };