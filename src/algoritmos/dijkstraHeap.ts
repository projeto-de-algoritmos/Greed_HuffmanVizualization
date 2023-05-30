import City from "src/entity/city";
import Edge from "src/entity/edge";
import Graph from "src/entity/graph";
import { HeapMin } from "./heap";
import Node1 from "src/entity/node";

// Função que implementa o algoritmo de Dijkstra
export default function dijkstra(graph: Graph, start: City, end: City): { distance: number, nodes: City[], edges: Edge[] } | null {
  const distances: { [key: string]: number } = {};
  const visited: { [key: string]: boolean } = {};
  const previous: { [key: string]: { node: Node1, edge: Edge } | null } = {};
  const heap = new HeapMin<{ node: Node1; distance: number }>();

  var count = 0;
  console.log(graph.nodes);
  console.log(graph.edges);
  // Inicializa as distâncias de todos os nós como infinito, exceto o nó de partida
  // graph.nodes.forEach((node) => {
  //   distances[node.city.name] = Infinity;
  //   visited[node.city.name] = false;
  //   previous[node.city.name] = null;
  //   count++;
  // });
  distances[start.name] = 0;

  // Insere o nó de partida no heap
  // if (graph.getNodebyCity(start) !== undefined) {
  //   const startNode = graph.getNodebyCity(start)!;
  //   heap.inserir(0, { node: startNode, distance: 0 });
  // }

  while (!heap.estaVazio()) {
    // Extrai o nó com menor distância do heap
    const { distancia, elemento } = heap.extrair()!;
    const { node, distance } = elemento;

  

    // Verifica se o nó já foi visitado
    if (visited[node.city.name]) {
      continue;
    }

    // Marca o nó como visitado
    visited[node.city.name] = true;
    
    if(node.city.name === end.name){
      break;
    }

    // Atualiza as distâncias dos nós vizinhos
    node.list.forEach((neighbor) => {
      const edge = graph.getEdge(node, neighbor)!;
      const newDistance = distance + edge.weight;
      if (newDistance < distances[neighbor.city.name]) {
        distances[neighbor.city.name] = newDistance;
        previous[neighbor.city.name] = { node: node, edge: edge };
        heap.inserir(newDistance, { node: neighbor, distance: newDistance });
      }
    });

     // Verifica se foi possível encontrar um caminho até a cidade de destino
    // if (previous[end.name] === null) {
    //   return null;
    // }
    count--;
    if(count<0)
      return null;
  }


  // Reconstrói o caminho a partir dos nós anteriores
  const nodes: City[] = [];
  const edges: Edge[] = [];
  let currentCity: City | null = end;
  while (currentCity !== null) {
    nodes.unshift(currentCity);
    const prev:any = previous[currentCity.name];
    if (prev) {
      edges.unshift(prev.edge);
      currentCity = prev.node.city;
    } else {
      currentCity = null;
    }
  }

  if(edges.length === 0)
    return null;
    
  return { distance: distances[end.name], nodes, edges };
}