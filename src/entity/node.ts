import City from "./city";

export default class Node1 {

    id: number;
    city: City;
    list: Node1[];

    constructor(id: number, city: City){
        this.id = id;
        this.city = city;
        this.list = [];
    }
}