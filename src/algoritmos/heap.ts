export class HeapMin<T> {
    private heap: { distancia: number; elemento: T }[];
  
    constructor() {
      this.heap = [];
    }
  
    private indicePai(index: number): number {
      return Math.floor((index - 1) / 2);
    }
  
    private indiceFilhoEsquerdo(index: number): number {
      return 2 * index + 1;
    }
  
    private indiceFilhoDireito(index: number): number {
      return 2 * index + 2;
    }
  
    private temPai(index: number): boolean {
      return this.indicePai(index) >= 0;
    }
  
    private temFilhoEsquerdo(index: number): boolean {
      return this.indiceFilhoEsquerdo(index) < this.heap.length;
    }
  
    private temFilhoDireito(index: number): boolean {
      return this.indiceFilhoDireito(index) < this.heap.length;
    }
  
    private pai(index: number): { distancia: number; elemento: T } {
      return this.heap[this.indicePai(index)];
    }
  
    private filhoEsquerdo(index: number): { distancia: number; elemento: T } {
      return this.heap[this.indiceFilhoEsquerdo(index)];
    }
  
    private filhoDireito(index: number): { distancia: number; elemento: T } {
      return this.heap[this.indiceFilhoDireito(index)];
    }
  
    private trocarIndices(index1: number, index2: number): void {
      const temp = this.heap[index1];
      this.heap[index1] = this.heap[index2];
      this.heap[index2] = temp;
    }
  
    public consultar(): { distancia: number; elemento: T } | null {
      if (this.heap.length === 0) {
        return null;
      }
      return this.heap[0];
    }
  
    public extrair(): { distancia: number; elemento: T } | null {
      if (this.heap.length === 0) {
        return null;
      }
      const item = this.heap[0];
      this.heap.shift();
      if(this.heap.length === 0){
        return item;
      }
      this.heap[0] = this.heap.pop()!;
      this.ajustarParaBaixo();
      return item;
    }
  
    public estaVazio(): boolean {
      return this.heap.length === 0;
    }
  
    public inserir(distancia: number, elemento: T): void {
      const novoItem = { distancia, elemento };
      this.heap.push(novoItem);
      this.ajustarParaCima();
    }
  
    public atualizar(elemento: T, novaDistancia: number): void {
      const index = this.heap.findIndex((item) => item.elemento === elemento);
      if (index < 0) {
        this.inserir(novaDistancia, elemento);
      }
      const distanciaAntiga = this.heap[index].distancia;
      if (novaDistancia < distanciaAntiga) {
        this.heap[index].distancia = novaDistancia;
        this.ajustarParaCima(index);
      }
    }
  
    private ajustarParaCima(index: number = this.heap.length - 1): void {
      while (
        this.temPai(index) &&
        this.pai(index).distancia > this.heap[index].distancia
      ) {
        const indicePai = this.indicePai(index);
        this.trocarIndices(index, indicePai);
        index = indicePai;
      }
    }
  
    private ajustarParaBaixo(index: number = 0): void {
      while (this.temFilhoEsquerdo(index)) {
        let indiceFilhoMenor = this.indiceFilhoEsquerdo(index);
        if (
          this.temFilhoDireito(index) &&
          this.filhoDireito(index).distancia <
            this.filhoEsquerdo(index).distancia
        ) {
          indiceFilhoMenor = this.indiceFilhoDireito(index);
        }
        if (
          this.heap[index].distancia < this.heap[indiceFilhoMenor].distancia
        ) {
          break;
        } else {
          this.trocarIndices(index, indiceFilhoMenor);
          index = indiceFilhoMenor;
        }
      }
    }
  }
  
  