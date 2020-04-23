/*
 *  ' lexer.js '
 *
 *      lexical analysis; create tokens
 */

import { Token, TokenType } from "./token.mjs";
import { Diagnostic, Location } from "./diagnostic.mjs";

export class Lexer {
    constructor(code) {
        this.code = code;
        this.position = 0;
        this.col = 1;
        this.line = 1;
        this.diagnosis = [];
    }

    peek(offset) {
        let index = this.position + offset;
        return (index >= this.code.length) ? "\0" : this.code[index];
    }

    current() {
        return this.peek(0);
    }

    lookAhead() {
        return this.peek(1);
    }

    isAlpha(char) {
        char = char.charCodeAt(0);
		return ((char >= 65) && (char <= 90)) || ((char >= 97) && (char <= 122)) ||
			char == 36 || char == 95;
	}

	isNumber(char) {
        char = char.charCodeAt(0);
		return char >= 48 && char <= 57;
	}
    
	isNewLine(char) {
        char = char.charCodeAt(0)
		return char == 10;
	}

	isWS(char) {
        char = char.charCodeAt(0)
		return char == 32 || char == 9 || char == 11;
	}

    isAlphaNum(char) {
        return this.isNumber(char) || this.isAlpha(char);
    }

    tokenize() {
        var type;
        var value = "";

        switch (this.current()) {
            case '\0':
                type = TokenType.EOF;
                this.col++;
                this.position++;
                break;
            case '+':
                type = TokenType.ADD;
                value = '+';
                this.col++;
                this.position++;
                break;
            case '-':
                type = TokenType.SUB;
                value = '-';
                this.col++;
                this.position++;
                break;
            case '*':
                type = TokenType.MUL;
                value = '*';
                this.col++;
                this.position++;
                break;
            case '/':
                type = TokenType.DIV;
                value = '/';
                this.col++;
                this.position++;
                break;
            case '%':
                type = TokenType.MOD;
                value = '%';
                this.col++;
                this.position++;
                break;
            case '<':
                type = TokenType.LT;
                value = '<';
                this.col++;
                this.position++;

                if (this.current() == '=') {
                    type = TokenType.LTE;
                    value = "<=";
                    this.col++;
                    this.position++;

                    if (this.current() == '>') {
                        type = TokenType.COMB_COMP;
                        value = "<=>";
                        this.col++;
                        this.position++;
                    }
                } else if (this.current() == '<') {
                    type = TokenType.LSTREAM;
                    value = "<<";
                    this.col++;
                    this.position++;
                }
                break;
            case '>':
                type = TokenType.GT;
                value = '>';
                this.col++;
                this.position++;

                if (this.current() == '=') {
                    type = TokenType.GTE;
                    value = ">=";
                    this.col++;
                    this.position++;
                }
                break;
            case '^':
                type = TokenType.CARET;
                value = '^';
                this.col++;
                this.position++;
                break;
            case '=':
                type = TokenType.EQUALS;
                value = '=';
                this.col++;
                this.position++;

                if (this.current() == '=') {
                    type = TokenType.EQ;
                    value = "==";
                    this.col++;
                    this.position++;
                }
                break;
            case '[':
                type = TokenType.LBRACK;
                value = '[';
                this.col++;
                this.position++;
                break;
            case ']':
                type = TokenType.RBRACK;
                value = ']';
                this.col++;
                this.position++;
                break;
            case '(':
                type = TokenType.LPAREN;
                value = '(';
                this.col++;
                this.position++;
                break;
            case ')':
                type = TokenType.RPAREN;
                value = ')';
                this.col++;
                this.position++;
                break;
            case '@':
                type = TokenType.AT;
                value = '@';
                this.col++;
                this.position++;
                break;
            case '.':
                type = TokenType.DOT;
                value = '.';
                this.col++;
                this.position++;
                break;
            case '#':
                type = TokenType.COMMENT;
                value = '#';
                this.col++;
                this.position++;
                break;
            case '{':
                type = TokenType.LCURLY;
                value = '{';
                this.col++;
                this.position++;
                break;
            case '}':
                type = TokenType.RCURLY;
                value = '}';
                this.col++;
                this.position++;
                break;
            case '|':
                type = TokenType.OR_BIT;
                value = '|';
                this.col++;
                this.position++;

                if (this.current() == '|') {
                    type = TokenType.OR;
                    value = "||";
                    this.col++;
                    this.position++;
                }
                break;
            case '&':
                type = TokenType.AND_BIT;
                value = '&';
                this.col++;
                this.position++;

                if (this.current() == '&') {
                    type = TokenType.AND;
                    value = "&&";
                    this.col++;
                    this.position++;
                }
                break;
            case '\n':
                type = TokenType.NEWLINE;
                value = "\\n";
                this.col = 0;
                this.line++;
                this.position++;
                break;
            case '\"':
                type = TokenType.STRING;
                value = "";
                this.col++;
                this.position++;

                while (this.current() != '\"') {
                    value += this.current();
                    this.col++;
                    this.position++;
                }

                this.col++;
                this.position++;
                break;
            case '\'':
                type = TokenType.STRING;
                value = "";
                this.col++;
                this.position++;

                while (this.current() != '\'') {
                    value += this.current();
                    this.col++;
                    this.position++;
                }

                this.col++;
                this.position++;
                break;
            default:
                if (this.isNumber(this.current())) {
                    type = TokenType.DIGIT;
                    value += this.current();
                    this.col++;
                    this.position++;
                    
                    while (this.isNumber(this.current())) {
                        value += this.current();
                        this.col++;
                        this.position++;
                    }
                } else if (this.isAlpha(this.current())) {
                    type = TokenType.IDENT;

                    if (this.current() == this.current().toUpperCase()) {
                        type = TokenType.CONSTANT;
                    }

                    value += this.current();
                    this.col++;
                    this.position++;
                    
                    while (this.isAlphaNum(this.current())) {
                        value += this.current();
                        this.col++;
                        this.position++;
                    }

                    switch (value) {
                        case "if":
                            type = TokenType.IF;
                            break;
                        case "else":
                            type = TokenType.ELSE;
                            break;
                        case "elsif":
                            type = TokenType.ELSIF;
                            break;
                        case "let":
                            type = TokenType.LET;
                            break;
                        case "def":
                            type = TokenType.DEF;
                            break;
                        case "true":
                            type = TokenType.TRUE;
                            break;
                        case "false":
                            type = TokenType.FALSE;
                            break;
                        case "and":
                            type = TokenType.AND;
                            break;
                        case "or":
                            type = TokenType.OR;
                            break;
                        case "nil":
                            type = TokenType.NIL;
                            break;
                        case "end":
                            type = TokenType.END;
                            break;
                        case "while":
                            type = TokenType.WHILE;
                            break;
                        case "do":
                            type = TokenType.DO;
                            break;
                        case "in":
                            type = TokenType.IN;
                            break;
                        case "for":
                            type = TokenType.FOR;
                            break;
                        case "case":
                            type = TokenType.CASE;
                            break;
                        case "when":
                            type = TokenType.WHEN;
                            break;
                        case "begin":
                            type = TokenType.BEGIN;
                            break;
                        case "raise":
                            type = TokenType.RAISE;
                            break;
                        case "rescue":
                            type = TokenType.RESCUE;
                            break;
                        case "ensure":
                            type = TokenType.ENSURE;
                            break;
                        case "class":
                            type = TokenType.CLASS;
                            break;
                        case "include":
                            type = TokenType.INCLUDE;
                            break;
                        case "extend":
                            type = TokenType.EXTEND;
                            break;
                        case "module":
                            type = TokenType.MODULE;
                            break;
                        case "self":
                            type = TokenType.SELF;
                            break;
                    }
                } else if (this.isWS(this.current())) {
                    while (this.isWS(this.current())) {
                        this.col++;
                        this.position++;
                    }

                    type = TokenType.WS;
                    value = "WS";
                } else {
                    this.diagnosis.push(new Diagnostic(new Location(this.line, this.col), "Unknown symbol"));
                }
        }

        return new Token(type, value);
    }
};

let lexer = new Lexer("x <=> 5\n");
var tokens = [];
var token = lexer.tokenize();

while (token.type != TokenType.EOF) {
    if (lexer.diagnosis.length > 0) {
        for (var diag in lexer.diagnosis) {
            console.log(lexer.diagnosis[diag].toString());
        }

        break;
    }

    tokens.push(token);
    token = lexer.tokenize();
}

for (var t in tokens) {
    console.log(tokens[t].display());
}