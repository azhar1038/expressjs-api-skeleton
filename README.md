# Initial setup using yarn

### Initialize the project:

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

### Add typescript support:

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
