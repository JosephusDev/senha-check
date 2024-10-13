# 🔑 Senha-Check

**Senha-Check** é um pacote para validação de senhas em JavaScript e TypeScript. Ele permite definir regras personalizadas para garantir a força e a segurança das senhas utilizadas em sua aplicação.

## Índice

- [Instalação](#instalação)
- [Uso](#uso)
  - [JavaScript](#javascript)
  - [TypeScript](#typescript)
- [API](#api)
  - [Classe `ValidadorSenha`](#classe-validadorsenha)
    - [Métodos](#métodos)
      - [`min(valor: number): this`](#minvalor-number-this)
      - [`max(valor: number): this`](#maxvalor-number-this)
      - [`temMaiusculas(valor?: number): this`](#temmaiúsculasvalor-number-this)
      - [`temMinusculas(valor?: number): this`](#temminusculasvalor-number-this)
      - [`digitos(valor?: number): this`](#digitosvalor-number-this)
      - [`temCaracteresEspeciais(valor?: number): this`](#temcaracteresespeciaisvalor-number-this)
      - [`sem(): { espaco(): this; digitos(): this; }`](#sem---espaco-this-digitos-this-)
      - [`validar(senha: string, opções?: DetalhesOpcoes): boolean \| string \| string[]`](#validarsenha-string-opções-detalhesopcoes-boolean--string--string-)
      - [`forca(senha: string): number`](#forcasenha-string-number)
- [Exemplos](#exemplos)
  - [JavaScript](#javascript-1)
  - [TypeScript](#typescript-1)

## Instalação

Você pode instalar o **senha-check** via npm ou yarn:

```bash
npm install senha-check
```

```bash
yarn add senha-check
```
## Uso

#### Javascript

```js
// Importando o ValidadorSenha (CommonJS)
const ValidadorSenha = require('senha-check');

// Ou, se estiver usando ESM
// import ValidadorSenha from 'senha-check';

const esquema = new ValidadorSenha();

esquema
    .min(4)
    .max(8)
    .temCaracteresEspeciais()
    .temMaiusculas(2)
    .temMinusculas()
    .sem().digitos();

const senha = "1234";

console.log(esquema.validar(senha, { detalhes: true }));
console.log("Força: " + esquema.forca(senha));

```
#### Typescript

```ts
// Importando o ValidadorSenha
import ValidadorSenha from 'senha-check';

const esquema = new ValidadorSenha();

esquema
    .min(6)
    .max(12)
    .temCaracteresEspeciais(2)
    .temMaiusculas()
    .temMinusculas(3)
    .sem().espaco();

const senha: string = "Senha@123";

const resultado: boolean | string | string[] = esquema.validar(senha, { detalhes: true });
const forca: number = esquema.forca(senha);

console.log(resultado);
console.log(`Força da senha: ${forca}`);

```


