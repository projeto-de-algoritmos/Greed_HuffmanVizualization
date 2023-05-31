import Arvore from "src/entity/arvore";
import Edge1 from "src/entity/edge";
import Graph from "src/entity/graph";
import No from "src/entity/no";
import PriorityQueue from "./priorityQueue";

export default class Huffman{

    listaNo: No[];
    letras: string[];
    frequencias: number[];
    listaArestas: Edge1[];


    listaIdNoSemCarac: number[] = [];

    IdNos = 0;
    idArvore = 0;
    idAresta = 0;
    count = 0;

    constructor(){
        this.listaNo = [];
        this.letras = [];
        this.frequencias = [];
        this.listaArestas = [];

    }

    frequenciaCaracter(frase: string): No[] {

        
        var listaNos: No[] = [];        

        for(let x = 0; x < frase.length; x++){
            if(listaNos.find(n => n.caracter === frase[x])){

                var index = listaNos.findIndex(n => n.caracter === frase[x])
                listaNos[index].peso = listaNos[index].peso+1;
            }
            else{
                var newNo = new No(this.IdNos++,frase[x],1);
                listaNos.push(newNo);
                this.listaNo.push(newNo);
                this.count++;
            }
        }

        return listaNos;
    }

    gerarArvoreHuff(nos: No[]): Arvore| null{

        var queue = new PriorityQueue<Arvore>();
        var resultArvore = new Arvore();

        for(let i=0; i<nos.length; i++){
            var newArvore = new Arvore(nos[i].id, nos[i].peso);
            newArvore.no = nos[i];

            queue.enqueue(newArvore, newArvore.peso);
        }


        while(!queue.isEmpty()){

            if(queue.size() === 1){
                var arv1 = queue.dequeue();
                return arv1;
            }

            var arv1 = queue.dequeue();
            var arv2 = queue.dequeue();


            var temp = this.juntar(arv1!, arv2!);
            queue.enqueue(temp, temp.peso);
            
        }
        return resultArvore;
        
    }

    juntar(result: Arvore, arv: Arvore): Arvore{
        this.listaIdNoSemCarac.push(this.IdNos);
        var novaArv = new Arvore(this.IdNos++);

        novaArv.peso = result.peso+arv.peso;

        novaArv.direita = result;
        novaArv.esquerda = arv;


        var newAresta1 = new Edge1(this.idAresta++, novaArv.id, result.id, 1);
        var newAresta0 = new Edge1(this.idAresta++, novaArv.id, arv.id, 0);

        this.listaArestas.push(newAresta0);
        this.listaArestas.push(newAresta1);

        return novaArv;
    }


}