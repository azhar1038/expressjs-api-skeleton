# API using Express and Typescript

An MVC architecture based NodeJS API skeleton using Express and Typescript

## Table of Contents

- [Technologies and Libraries used](#technologies-and-libraries-used)
- [Initial setup using yarn](#initial-setup-using-yarn)
  - [Initialize the project](#initialize-the-project)
  - [Add Editor config](#add-editor-config)
  - [Add typescript support](#add-typescript-support)
  - [Add Eslint](#add-eslint)
  - [Add Prettier](#add-prettier)
  - [Add Husky](#add-husky)
  - [Add lint-staged](#add-lint-staged)
- [Project Structure](#project-structure)
  - [`api` folder](#api-folder)
  - [`config` folder](#config-folder)
  - [`services` folder](#services-folder)
  - [`test` folder](#test-folder)

## Technologies and Libraries used

- NodeJS
- Typescript
- Yarn
- bcrypt
- cors
- dotenv
- express
- jsonwebtoken
- winston
- eslint
- husky
- lint-staged
- prettier
- tsx

## Initial setup using yarn

### Initialize the project

```shell
yarn --init
```

### Add Editor config

This is to provide similar editor configuration for all developers.  
Install VS Code extension `EditorConfig for VS Code`  
Add a file named `.editorconfig` with the following contents

```yaml
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
insert_final_newline = true
trim_trailing_whitespace = true


[*.{diff,md}]
trim_trailing_whitespace = false
```

### Add typescript support

```shell
yarn add -D typescript
npx tsc --init
```

Use the following default settings for .tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["ES2018", "dom"],
    "target": "ES2018",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create a folder `src`. This will be our main folder which will contain all files. Create a `index.ts` inside this with some simple code like

```js
console.log('Hello world');
```

### Add Eslint

This is used to add linting support i.e, automated checking of source code for programmatic and stylistic errors.

```shell
yarn add -D eslint
yarn add -D @typescript-eslint/eslint-plugin
yarn add -D @typescript-eslint/parser
```

Create a file `.eslintrc` and add the following config

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": ["plugin:@typescript-eslint/recommended"],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {}
}
```

Also add the following scripts in `package.json`

```json
{
  "scripts": {
    "lint": "eslint src/**/*.ts",
    "format": "eslint src/**/*.ts --fix"
  }
}
```

### Add Prettier

This helps to achieve similar formatting of code even if different person have written it as per their way, like different tab length.

```shell
yarn add -D prettier
```

Create a file `.prettierrc` and add the following config

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 120,
  "tabWidth": 2
}
```

Install `Prettier - Code formatter` extension in VS Code.  
Choose Prettier as your default code formatter and enable Format on save optionally for better experience.

OR

Press `Ctrl` + `Shift` + `P` to open command palette and click on "Open User Settings (JSON)". This opens the `settings.json` file. Add the following settings

```json
{
    ...

  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true
}
```

### Add Husky

This is to add some git hooks so that we can do some checks like running test cases or linting before pushing to remote and failing there. (or just manually edit .git/hooks)

```shell
npx husky-init && yarn
```

This also adds a "prepare" script in `package.json`.  
To avoid this one can use

```shell
yarn add -D husky
./node_modules/.bin/husky install
```

Husky should create a `.husky` folder. Create a file named `pre-commit` here if not already present. This will work as pre-commit hook. Add/modify the content to:

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo -e "\n[Husky] pre-commit hook"
yarn lint
```

### Add lint-staged

This can be used to run Prettier on all the staged file which is usefull if someone does not want to use "Format documnet on Save" feature.  
To install use:

```shell
yarn add -D lint-staged
```

Then create a new file named `.lintstagedrc` with following content to get started:

```json
{
  "*.ts": ["eslint src/**/*.ts --fix --max-warnings=0", "prettier --write"],
  "*.{js,md}": ["prettier --write"]
}
```

This instructs lint-staged to run eslint as well as prettier on staged ts files. `--max-warnings=0` is used to abort commit if eslint just gives warnings like unused imports or variables. Changes done by `lint-staged` are automatically added to git, so no need to run `git add .`

Then modify the `package.json` lint script to use lint-stage instead of eslint

```json
{
  "scripts": {
    "lint": "lint-staged"
  }
}
```

## Project Structure

The main folder here is the `src` folder with following structure:

```
src
├───api
│   ├───helper
│   ├───middleware
│   └───v1
│       └───components
│           ├───auth
│           └───user
├───config
├───services
└───test
```

Here there are 4 main folders: `api`, `config`, `services` and `test`.

### `api` folder

This folder contains all API related stuff.

```
api
│   server.ts
│
├───helper
│       component-routes.ts
│
├───middleware
│       auth-middleware.ts
│       index.ts
│
└───v1
    │   index.ts
    │
    └───components
        │   components.ts
        │
        ├───auth
        │       auth-controller.ts
        │       auth-routes.ts
        │
        └───user
                user-controller.ts
                user-routes.ts
```

The `helper` folder contains some interfaces.  
`middleware` folder contains the common middlewares like cors and auhenticate.  
I have used `v1` to represent API version. For new version add v2 folder when needed. Try to avoid creating new version and instead update v1 with backward compatibility.

#### `components` folder

`components` folder is the main folder containing all the api routes. Each component like user, auth are in their own respective folder. Each component contains `controller` and `routes` file.  
`routes` file define all the routes while `controller` defines all the logic. Test files can also be placed here

### `config` folder

This folder contains all global configuration related stuff and constants.

### `services` folder

This is also an important folder that provides classes/functions that act as an interface to 3rd party libraries or some common functions. It is usually advised to use services from other services or from controller only to create a proper separation of concerns and for better testability. This also makes sure that in future we can easily switch any 3rd party library with another if required.

### `test` folder

This contains the test files.
