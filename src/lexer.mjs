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
        char = char.charCodeAt(0)
		return char >= 48 && char <= 57;
	}

	isAlphaNum(char) {
        char = char.charCodeAt(0)
		return this.isLetter(char) || this.isNumber(char);
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
        char = char.charCodeAt(0)
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
            default:
                // digits
                if (this.isNumber(this.current())) {
                    type = TokenType.DIGIT;
                    value += this.current();
                    this.position++;
                    
                    while (this.isNumber(this.current())) {
                        value += this.current();
                        this.position++;
                    }
                }
        }

        return new Token(type, value);
    }
};

let lexer = new Lexer("123");
var tokens = [];
var token = lexer.tokenize();

while (token.type != TokenType.EOF) {
    tokens.push(token);

    token = lexer.tokenize();
}

for (var t in tokens) {
    console.log(tokens[t].display());
}