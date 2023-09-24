import { Item, ItemInfo } from "./models";
import { ShoppingListService } from "./service";

const storageKey = "items";

const prepareStorage = (storage: Storage) => {
  const items = storage.getItem(storageKey);
  if (!items) {
    storage.setItem(
      storageKey,
      JSON.stringify([
        {
          id: "1",
          info: {
            name: "Milk",
            quantity: 1,
          },
          checked: false,
        },
        {
          id: "2",
          info: {
            name: "Eggs",
            quantity: 12,
          },
          checked: false,
        },
        {
          id: "3",
          info: {
            name: "Bread",
            quantity: 2,
          },
          checked: false,
        },
      ])
    );
  }
};

export class ShoppingListServiceLocal implements ShoppingListService {
  private storage: Storage;

  constructor(storage: Storage = window.localStorage) {
    this.storage = storage;
    prepareStorage(this.storage);
  }

  async getItems(): Promise<Item[]> {
    return Promise.resolve(JSON.parse(this.storage.getItem(storageKey)!));
  }

  async addItem(info: ItemInfo): Promise<Item> {
    const item = {
      id: crypto.randomUUID(),
      info,
      checked: false,
    };
    this.storage.setItem(
      storageKey,
      JSON.stringify([...(await this.getItems()), item])
    );
    return item;
  }

  async removeItem(id: string): Promise<void> {
    var items = await this.getItems();
    items = items.filter((item) => item.id !== id);
    this.storage.setItem(storageKey, JSON.stringify(items));
  }

  async checkItem(id: string, checked: boolean): Promise<void> {
    var items = await this.getItems();
    items = items.map((item) => {
      if (item.id === id) {
        item.checked = checked;
      }
      return item;
    });
    this.storage.setItem(storageKey, JSON.stringify(items));
  }
}