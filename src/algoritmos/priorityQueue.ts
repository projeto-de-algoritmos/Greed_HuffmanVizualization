export default class PriorityQueue<T> {
    private queue: { priority: number; element: T }[];
  
    constructor() {
      this.queue = [];
    }
  
    public enqueue(element: T, priority: number): void {
      const item = { priority, element };
  
      let inserted = false;
      for (let i = 0; i < this.queue.length; i++) {
        if (priority < this.queue[i].priority) {
          this.queue.splice(i, 0, item);
          inserted = true;
          break;
        }
      }
  
      if (!inserted) {
        this.queue.push(item);
      }
    }
  
    public dequeue(): T | null {
      if (this.isEmpty()) {
        return null;
      }
      return this.queue.shift()!.element;
    }

  
    public peek(): T | undefined {
      if (this.isEmpty()) {
        return undefined;
      }
      return this.queue[0].element;
    }
  
    public isEmpty(): boolean {
      return this.queue.length === 0;
    }
  
    public size(): number {
      return this.queue.length;
    }
  }