import No from "src/entity/no";
import { HeapMin } from "./heap";
import Arvore from "src/entity/arvore";
import Edge1 from "src/entity/edge";
import Graph from "src/entity/graph";

export default class Huffman{

    listaNo: No[];
    letras: string[];
    frequencias: number[];
    listaArestas: Edge1[];

    count = 0;

    constructor(){
        this.listaNo = [];
        this.letras = [];
        this.frequencias = [];
        this.listaArestas = [];

    }

    frequeciaCaracter(frase: string): No[] {

        var IdNos = 1;
        var listaNos: No[] = [];        

        for(let x = 0; x < frase.length; x++){
            if(listaNos.find(n => n.caracter === frase[x])){

                var index = listaNos.findIndex(n => n.caracter === frase[x])
                listaNos[index].peso = listaNos[index].peso+1;
            }
            else{
                var newNo = new No(IdNos++,frase[x],1);
                listaNos.push(newNo);
                this.listaNo.push(newNo);
                this.count++;
            }
        }

        return listaNos;
    }

    gerarArvore(nos: No[]): Arvore| null{

        var heap = new HeapMin<Arvore>();
        var resultArvore = new Arvore();

        var listEdge: Edge1[] = [];

        for(let i=0; i<nos.length; i++){
            var newArvore = new Arvore(nos[i].peso);
            newArvore.no = nos[i];

            heap.inserir(newArvore.peso, newArvore);
        }

        while(!heap.estaVazio()){
            var arv1 = heap.extrair();
            var arv2 = heap.extrair();
            if(arv1 === null || arv2 === null){
                // this.juntar(resultArvore, arv.elemento);
                // heap.
                if(arv1 !== null){
                    return arv1.elemento;
                }
                else{
                    return arv2.elemento;
                }
            }
            heap.inserir(arv1.elemento.peso+arv2.elemento.peso,this.juntar(arv1.elemento, arv2.elemento));
            
        }
        return null;
        
    }

    juntar(result: Arvore, arv: Arvore): Arvore{
        if(result.peso === 0){
            result.direita = arv;
        }

        if(result.possuiApenasUmaFolha() && arv.possuiApenasUmaFolha()){

        }
    }
}