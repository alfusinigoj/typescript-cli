export class Entity {
  private data: any;

  fromJson(json: any): Entity {
    this.data = json;
    return this;
  }

  toJson(): any {
    // Example: remove internal fields or apply transformation
    return {
      id: this.data.id,
      name: this.data.name,
      active: this.data.active ?? true
    };
  }
}
