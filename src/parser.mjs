import { Lexer } from "./lexer.mjs";
import { TokenType } from "./token.mjs"
import { Diagnostic, Location } from "./diagnostic.mjs"

/*
 *  ' parser.js '
 *
 *      parsing..
 */

 export class Parser {
    constructor(code) {
        this.lexer = new Lexer(code);
        this.tokens = [];
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
 };