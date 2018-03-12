export default class FormState {
  store: Map<string, any>;

  constructor(store?: Map<string, any>) {
    if (!store) {
      store = new Map();
    }

    this.store = store;
  }

  set(identifier: string, value: any): FormState {
    const newStore = new Map(this.store);
    newStore.set(identifier, value);

    return new FormState(newStore);
  }

  get(identifier: string): any | null {
    return this.store.get(identifier);
  }

  has(identifier: string): boolean {
    return this.store.has(identifier);
  }

  toString() {
    const lines: string[] = [];

    this.store.forEach((value: any, name: string) => {
      lines.push(`${name}: ${value}`);
    });

    return lines.join("\n");
  }
}