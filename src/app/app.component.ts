import * as vis from 'vis';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Edge, Network, Node } from 'vis';

import City from 'src/entity/city';
import Edge1 from 'src/entity/edge';
import Graph from 'src/entity/graph';
import Node1 from 'src/entity/node';
import dijkstra from 'src/algoritmos/dijkstraHeap';
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
  dicionario: { [key: string]: number } = {};
  listaNos: No[] = []
  huffman = new Huffman();

  idNode: number = 0;
  idEdge: number = 0;

  
  
  listNode: Node1[] = [];
  listPesos: number[] = [1,2,3,4,5,6,7,8,9];

  nodeA: Node1 | null = null;
  nodeB: Node1 | null = null;
  pesoEdge: number = 0;
  
  //instancia o grafo
  Grafo = new Graph();
  graphContainer: any;

  network : any;

  cidadeStart: Node1 = new Node1(0, new City("a","b"));
  cidadeEnd: Node1 = new Node1(0, new City("a","b"));

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
    var options = {};

    this.network = new vis.Network(container, data, options);
    this.updateColor();
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
    if(this.nodeA === null || this.nodeB === null){
      alert("Selecione cidades");
      return;
    }
    
    if(this.nodeA === this.nodeB){
      alert("Não é possível adicionar estrada");
      return;
    }
    var edge = new Edge1(this.idEdge,this.nodeA.id, this.nodeB.id, this.pesoEdge);
    this.Grafo.addEdge(edge);
    
    this.network.body.data.edges.add({ id: this.idEdge, from: this.nodeA.id, to: this.nodeB.id, color:{color:"blue"}, label:this.pesoEdge.toString(), arrows: "to"});

    this.idEdge++;
  }

  updateColor(){
    var ed = this.network.body.data.edges;

    for(let i = 0; i < ed.length; i++){
      var ed1 = ed.get(i);
      ed1.color = {color:"blue"};
      ed1.width = 1;
      ed.update(ed1);
    }

    var result = dijkstra(this.Grafo, this.cidadeStart.city, this.cidadeEnd.city);
    
    if(result === null){
      alert("Não existe caminho entre as cidades");
      return;
    }else{

      var caminho = result?.edges!;

      for(let i = 0; i < caminho?.length; i++){
        var edge = ed.get(caminho[i].id);
        edge.color = {color:"red"};
        edge.width = 3;
        ed.update(edge);
      }
    }
  }

  gerarArvore(){
    this.Grafo.nodes = this.huffman.frequeciaCaracter(this.frase);
    
    
     
  }
}
