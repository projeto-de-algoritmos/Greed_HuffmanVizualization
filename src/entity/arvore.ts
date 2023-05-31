import No from "./no";

export default class Arvore {

    id: number
    raiz: Arvore| null;
    peso: number;
    esquerda: Arvore| null;
    direita: Arvore| null;
    no: No | null;
    

    constructor(id: number = -1, frequencia: number = 0){
        this.id = id;
        this.raiz = null
        this.peso = frequencia;
        this.esquerda = null;
        this.direita = null;
        this.no = null;
    }

    possuiApenasUmaFolha(): boolean {
        if (this.esquerda === null){
            return true;
        }
        return false;
    }
}