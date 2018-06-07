# Parse files

Parse info from text files to the correct format and order.

#### Example
```
Laker, Kyle, Male, Tan, 2/13/1943
Windel | Thomas | D | M | Red | 3-3-1985
Pirl Jessie F 12-2-1973 Black
```
to
```
Output 1:
Pirl Jessie Female 12/2/1973 Black
Laker Kyle Male 2/13/1943 Tan
Windel Thomas D Male 3/3/1985 Red

Output 2:
Laker Kyle Male 2/13/1943 Tan
Pirl Jessie Female 12/2/1973 Black
Windel Thomas D Male 3/3/1985 Red

Output 3:
Windel Thomas D Male 3/3/1985 Red
Pirl Jessie Female 12/2/1973 Black
Laker Kyle Male 2/13/1943 Tan
```

### Prerequisites

You will need to have an sufficient version of [node.js](https://nodejs.org/en/) and [npm](https://nodejs.org/en/) (or [yarn](https://yarnpkg.com/lang/en/)).

### Install

fs (file system) for reading and writing the files.
```
$ npm install fs 
```

jest will be used for testing.
```
$ npm install jest --save-dev
```

### Getting Started

Create package.json file
```
$ npm init -y
```

In the package.json file change the "index.js" to "app.js"
```
{
   "main": "app.js"
}
```

Create two new folders called "input" and "output". "input" will contain the text files to be read, and "output" will have the new written file.

Create two new files in the root folder called "app.js" and "app.test.js"

### Import text files

In "app.js"
```
const fs = require('fs');

const comma = fs.readFileSync('./input/comma.txt', 'utf8');
const pipe = fs.readFileSync('./input/pipe.txt', 'utf8');
const space = fs.readFileSync('./input/space.txt', 'utf8');
```

Concatenate the strings
```
const inputFiles = comma + '\n' + pipe + '\n' + space;
```

Now the text files are one.

Create various functions to organize file info.

## Run App

```
$ node app
```

When the app runs, an output file is created with all the files in the correct order.

## Run Tests

In the package.json, "test" should contain the following:
```
{
   "scripts": {
      "test": "jest"
   }
}
```

Export functions from "app.js"
```
module.exports = {
   function: function,
   function: function,
   ...
}
```

Import functions to "app.test.js" for testing.
```
const app = require('./app');
```

Jest runs any test file with a ".test.js" at the end.

Run tests.
```
$ npm test
```
or
```
$ yarn test
```