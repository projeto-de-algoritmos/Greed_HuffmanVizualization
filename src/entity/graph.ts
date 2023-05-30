import Edge1 from "./edge";
import Node1 from "./node";
import City from "./city";
import No from "./no";


export default class Graph {
    nodes: No[];
    edges: Edge1[];

    constructor(){
        this.nodes = [];
        this.edges = [];
    }

    addNode(newNode: No):void {
        this.nodes.push(newNode);
    }

    addEdge(newEdge: Edge1): void{

        var nodeA = this.nodes.findIndex(x => x.id == newEdge.begin);
        var nodeB = this.nodes.findIndex(x => x.id == newEdge.end);

        //this.nodes[nodeA].list.push(this.nodes[nodeB])
        
        this.edges.push(newEdge);
    }

    getNode(id: number): No | undefined{
        return this.nodes.find(x => x.id == id);
    }


    // getNodebyCity(CidadeProcurada: City): Node1 | undefined {
    //     const temp = this.nodes.find(x => x.city == CidadeProcurada);
    //     return temp;
    // }

    getEdge(nodeA: Node1, nodeB: Node1): Edge1 | undefined {
        return this.edges.find(x => x.begin == nodeA.id && x.end == nodeB.id);
    
    }


}