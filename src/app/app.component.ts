import * as vis from 'vis';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Edge, Network, Node } from 'vis';

import Arvore from 'src/entity/arvore';
import Edge1 from 'src/entity/edge';
import Graph from 'src/entity/graph';
import Huffman from 'src/algoritmos/huffman';
import No from 'src/entity/no';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('mynetwork', { static: true }) container!: ElementRef;

  title = 'graph2';

  frase: string = "";
  listaNos: No[] = []
  huffman = new Huffman();


  //instancia o grafo
  Grafo = new Graph();
  graphContainer: any;

  network : any;


  ngOnInit(){
    var nodes = new vis.DataSet([

    ]);

  // create an array with edges
    var edges = new vis.DataSet([

    ]);

    var container = this.container.nativeElement;

    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {layout:{hierarchical:{enabled:true}, sortMethod: 'directed',  shakeTowards: 'roots'}};

    this.network = new vis.Network(container, data, options);
  }

  
  addNode():void {
    
    //var city = new City(this.name, this.description);
    //var node = new Node1(this.idNode, city);

    // this.listNode.push(node);
    // this.Grafo.addNode(node);
    
    // this.network.body.data.nodes.add({ id: this.idNode, label: this.name });

    // this.idNode++;
  }

  addEdge():void {

    
 //   this.network.body.data.edges.add({ id: this.idEdge, from: this.nodeA.id, to: this.nodeB.id, color:{color:"blue"}, label:this.pesoEdge.toString(), arrows: "to"});

  }

  updateColor(){
    var ed = this.network.body.data.edges;

    for(let i = 0; i < ed.length; i++){
      var ed1 = ed.get(i);
      ed1.color = {color:"blue"};
      ed1.width = 1;
      ed.update(ed1);
    }

  }

  gerarArvore(){


    var frase1 = this.huffman.frequenciaCaracter(this.frase);

    this.listaNos = frase1;

    var Huff = this.huffman.gerarArvoreHuff(frase1); 


    console.log(this.huffman.listaArestas)
    //console.log(this.huffman.)

    for(let i=0; i<this.huffman.listaNo.length; i++){
      this.network.body.data.nodes.add({ id: this.huffman.listaNo[i].id, label: this.huffman.listaNo[i].caracter });
    }

    for(let i=0; i<this.huffman.listaIdNoSemCarac.length; i++){
      this.network.body.data.nodes.add({ id: this.huffman.listaIdNoSemCarac[i], label: ""});
    }

    for(let i=0; i<this.huffman.listaArestas.length; i++)
    this.network.body.data.edges.add({ id: this.huffman.listaArestas[i].id, from: this.huffman.listaArestas[i].begin, to: this.huffman.listaArestas[i].end, color:{color:"blue"}, label:this.huffman.listaArestas[i].weight.toString(), arrows: "to"});
  }

}
