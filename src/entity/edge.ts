export default class Edge1 {
    id: number;
    weight: number;
    begin: number;
    end: number;

    constructor(id: number, begin: number, end: number, weight: number){
        this.id = id;
        this.begin = begin;
        this.end = end;
        this.weight = weight;
    }
    
}