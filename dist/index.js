"use strict";
class ValidadorSenha {
    constructor() {
        this.regras = {};
        this.regrasNegadas = {};
    }
    min(valor) {
        this.regras.min = valor;
        return this;
    }
    max(valor) {
        this.regras.max = valor;
        return this;
    }
    temMaiusculas(valor = 1) {
        this.regras.maiusculas = valor;
        return this;
    }
    temMinusculas(valor = 1) {
        this.regras.minusculas = valor;
        return this;
    }
    digitos(valor = 1) {
        this.regras.digitos = valor;
        return this;
    }
    temCaracteresEspeciais(valor = 1) {
        this.regras.carcateresEspeciais = valor;
        return this;
    }
    sem() {
        return {
            espaco: () => {
                this.regrasNegadas.espaco = true;
                return this;
            },
            digitos: () => {
                this.regrasNegadas.digitos = true;
                return this;
            }
        };
    }
    validar(senha, { detalhes = false } = {}) {
        const falhas = [];
        if (this.regras.min && senha.length < this.regras.min) {
            falhas.push(`A senha precisa ter pelo menos ${this.regras.min} caracteres.`);
        }
        if (this.regras.max && senha.length > this.regras.max) {
            falhas.push(`A senha deve ter no máximo ${this.regras.max} caracteres.`);
        }
        const maiusculas = senha.replace(/[^A-Z]/g, "").length;
        if (this.regras.maiusculas && maiusculas < this.regras.maiusculas) {
            falhas.push(`A senha precisa ter pelo menos ${this.regras.maiusculas} letra(s) maiúscula(s).`);
        }
        const minusculas = senha.replace(/[^a-z]/g, "").length;
        if (this.regras.minusculas && minusculas < this.regras.minusculas) {
            falhas.push(`A senha precisa ter pelo menos ${this.regras.minusculas} letra(s) minúscula(s).`);
        }
        const digitos = senha.replace(/[^0-9]/g, "").length;
        if (this.regras.digitos && digitos < this.regras.digitos) {
            falhas.push(`A senha precisa ter pelo menos ${this.regras.digitos} dígito(s).`);
        }
        const carcateresEspeciais = senha.replace(/[a-zA-Z0-9]/g, "").length;
        if (this.regras.carcateresEspeciais && carcateresEspeciais < this.regras.carcateresEspeciais) {
            falhas.push(`A senha precisa ter pelo menos ${this.regras.carcateresEspeciais} caractere(s) especial(is).`);
        }
        if (this.regrasNegadas.espaco && /\s/.test(senha)) {
            falhas.push("A senha não pode conter espaços.");
        }
        if (this.regrasNegadas.digitos && digitos > 0) {
            falhas.push("A senha não pode conter dígitos.");
        }
        if (detalhes) {
            return falhas.length > 0 ? falhas : "Senha válida!";
        }
        return falhas.length === 0;
    }
    forca(senha) {
        let forca = 0;
        if (senha.length >= 8)
            forca++;
        if (senha.length >= 12)
            forca++;
        const maiusculas = /[A-Z]/.test(senha);
        const minusculas = /[a-z]/.test(senha);
        const digitos = /[0-9]/.test(senha);
        const especiais = /[^a-zA-Z0-9]/.test(senha);
        if (maiusculas)
            forca++;
        if (minusculas)
            forca++;
        if (digitos)
            forca++;
        if (especiais)
            forca++;
        const repetido = /(\w)\1\1/.test(senha);
        const sequencia = /123|234|345|456|567|678|789|012|abc|bcd|cde/.test(senha);
        if (repetido || sequencia)
            forca--;
        return Math.max(0, Math.min(4, forca));
    }
}
// Exportando de forma compatível com CommonJS e ES Modules
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ValidadorSenha;
    module.exports.default = ValidadorSenha; // Compatível com ESM
}