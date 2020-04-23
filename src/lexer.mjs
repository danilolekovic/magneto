/*
 *  ' lexer.js '
 *
 *      lexical analysis; create tokens
 */

import { Token, TokenType } from "./token.mjs";

export class Lexer {
    constructor(code) {
        this.code = code;
        this.position = 0;
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
                this.position++;
                break;
            case '+':
                type = TokenType.ADD;
                value = '+';
                this.position++;
                break;
            case '-':
                type = TokenType.SUB;
                value = '-';
                this.position++;
                break;
            case '*':
                type = TokenType.MUL;
                value = '*';
                this.position++;
                break;
            case '/':
                type = TokenType.DIV;
                value = '/';
                this.position++;
                break;
            case '%':
                type = TokenType.MOD;
                value = '%';
                this.position++;
                break;
            case '^':
                type = TokenType.CARET;
                value = '^';
                this.position++;
                break;
            case '=':
                type = TokenType.EQ;
                value = '=';
                this.position++;
                break;
            case '[':
                type = TokenType.LBRACK;
                value = '[';
                this.position++;
                break;
            case ']':
                type = TokenType.RBRACK;
                value = ']';
                this.position++;
                break;
            case '(':
                type = TokenType.LPAREN;
                value = '(';
                this.position++;
                break;
            case ')':
                type = TokenType.RPAREN;
                value = ')';
                this.position++;
                break;
            case '@':
                type = TokenType.AT;
                value = '@';
                this.position++;
                break;
            case '.':
                type = TokenType.DOT;
                value = '.';
                this.position++;
                break;
            case '#':
                type = TokenType.COMMENT;
                value = '#';
                this.position++;
                break;
            case '{':
                type = TokenType.LCURLY;
                value = '{';
                this.position++;
                break;
            case '}':
                type = TokenType.RCURLY;
                value = '}';
                this.position++;
                break;
            case '|':
                type = TokenType.OR_BIT;
                value = '|';
                this.position++;

                if (this.lookAhead() == '|') {
                    type = TokenType.OR;
                    value = "||";
                    this.position++;
                }
                break;
            case '&':
                type = TokenType.AND_BIT;
                value = '&';
                this.position++;

                if (this.lookAhead() == '&') {
                    type = TokenType.AND;
                    value = "&&";
                    this.position++;
                }
                break;
            case '\n':
                type = TokenType.NEWLINE;
                value = "\\n";
                this.position++;
                break;
            case '\"':
                type = TokenType.STRING;
                value = "";
                this.position++;

                while (this.current() != '\"') {
                    value += this.current();
                    this.position++;
                }

                this.position++;
                break;
            case '\'':
                type = TokenType.STRING;
                value = "";
                this.position++;

                while (this.current() != '\'') {
                    value += this.current();
                    this.position++;
                }

                this.position++;
                break;
            default:
                if (this.isNumber(this.current())) {
                    type = TokenType.DIGIT;
                    value += this.current();
                    this.position++;
                    
                    while (this.isNumber(this.current())) {
                        value += this.current();
                        this.position++;
                    }
                } else if (this.isAlpha(this.current())) {
                    type = TokenType.IDENT;

                    if (this.current() == this.current().toUpperCase()) {
                        type = TokenType.CONSTANT;
                    }

                    value += this.current();
                    this.position++;
                    
                    while (this.isAlphaNum(this.current())) {
                        value += this.current();
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
                        this.position++;
                    }

                    type = TokenType.WS;
                    value = "WS";
                }
        }

        return new Token(type, value);
    }
};

let lexer = new Lexer("def Const = \"Test\"\n");
var tokens = [];
var token = lexer.tokenize();

while (token.type != TokenType.EOF) {
    tokens.push(token);

    token = lexer.tokenize();
}

for (var t in tokens) {
    console.log(tokens[t].display());
}