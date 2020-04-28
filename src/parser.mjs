/*
 *  ' parser.js '
 *
 *      parsing..
 */

import { Lexer } from "./lexer.mjs";
import { TokenType } from "./token.mjs"
import { Diagnostic, Location } from "./diagnostic.mjs"

 export class Parser {
    constructor(code) {
        this.lexer = new Lexer(code);
        this.tokens = [];
        this.tree = [];
        this.position = 0;
        this.diagnosis = [];
        this.location = new Location(1, 1);

        var token = this.lexer.tokenize();

        while (token.type != TokenType.EOF) {
            if (this.lexer.diagnosis.length > 0) {
                for (var diag in this.lexer.diagnosis) {
                    console.log(this.lexer.diagnosis[diag].toString());
                }

                break;
            }

            this.tokens.push(token);
            token = this.lexer.tokenize();
        }
    }

    peek(offset) {
        let index = this.position + offset;
        return (index >= this.tokens.length) ? "\0" : this.tokens[index];
    }

    current() {
        return this.peek(0);
    }

    lookAhead() {
        return this.peek(1);
    }

    expectingNext(tokenType) {
        return this.lookAhead().type == tokenType;
    }

    expectingNow(tokenType) {
        return this.current().type == tokenType;
    }

    parse() {
        switch (this.current().type) {
            case TokenType.IF:
                break;
            case TokenType.IDENT:
                break;
            case TokenType.LET:
                break;
            case TokenType.DEF:
                break;
            case TokenType.WHILE:
                break;
            case TokenType.FOR:
                break;
            case TokenType.CASE:
                break;
            case TokenType.BEGIN:
                break;
            case TokenType.CLASS:
                break;
            case TokenType.INCLUDE:
                break;
            case TokenType.MODULE:
                break;
            case TokenType.SELF:
                break;
            case TokenType.COMMENT:
                break;
            case TokenType.NEWLINE:
                break;
            default:
                this.diagnosis.push(new Diagnostic(new Location(this.location.line, this.location.col), "Expected statement"));
        }
    }

    parseExpression() {
        switch (this.current().type) {
            case TokenType.IDENT:
                break;
            case TokenType.CONSTANT:
                break;
            case TokenType.DIGIT:
                break;
            case TokenType.TRUE:
            case TokenType.FALSE:
            case TokenType.NIL:
                break;
            case TokenType.SELF:
                break;
            case TokenType.LPAREN:
                break;
            case TokenType.LBRACK:
                break;
            case TokenType.NOT:
                break;
            case TokenType.STRING:
                break;
            default:
                this.diagnosis.push(new Diagnostic(new Location(this.location.line, this.location.col), "Expected expression"));
        }
    }
 };