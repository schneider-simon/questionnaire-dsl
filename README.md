# NEWSKQL - New Schneider Kalf Questionnaire Language

DSL for Questionnaire Language

## Demo

Feel free to try out the DSL editor on the demo website:

[http://sp.schneider.click/](http://sp.schneider.click/) 

So far it only outputs the given questionnaire to a JSON textarea.

## Development

**Requirements:**

* Node: [https://nodejs.org](https://nodejs.org/)
* NPM: [https://www.npmjs.com/](https://www.npmjs.com/)
* Yarn: [https://yarnpkg.com](https://yarnpkg.com/en/)

**Install dependencies:** 

Only necessary if dependencies changed or first run.

```
yarn
```


**Run development server:**

```
yarn start
```

Visit [http://localhost:3000](http://localhost:3000/)

## Generating a new parser

**Requirements to generate parser**

You need a [global installation of pegjs](https://github.com/pegjs/pegjs) to run the parser generator command
below:

```bash
npm install -g pegjs
```

**Run QL parser generator**

After making changes to `src/parsing/grammars/ql_grammar.pegts`
you can run the following command to generate a new parser:

```
npm run generate:ql
```

The results will be written to `src/parsing/parsers/ql_parser.ts`.
If the development server is running it will automatically reload.

## Tests

To run the tests inside `src/test` please execute: 

```
yarn test
```

This will watch all files for changes and execute the tests every time a 
file is saved. You maybe have to press `a` initially to run all tests.

## Build for production

```
yarn build
```

Result will be written into the `/build` folder

## Doubts

* Can we have escape characters in string \"?
* Are comments allowed (and which comments?)?
* Are new lines required by the syntax?
* Double and single string support?

* What's the date format?
* What's the money format?
* Or just call everything Literal (as JS does)?
* support multiple minuses --3 (python does)?

* (FIXED) minus numbers
* (FIXED) unary !

* TODO: Replace this simple integer check with solution in parser, differentiate between 10 and 10.0 (See type check visitor visitNumberLiteral)
* TODO: Allow money and date literal (See type check visitor visitNumberLiteral)
* TODO: Allow float literals (5.1 and 5.0)
* TODO: money = (50 + 10) results in Addition(NumberLiteral(5), NumberLiteral(10))
* TODO: Every character of changed field is in state (Maybe kill state when form changes?)
* TODO: Divide money by money transformed to float
* TODO: SellingPrice: boolean = (1 / 10) is not a problem
* TODO improve naming