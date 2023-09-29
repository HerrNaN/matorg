import { Item, ItemInfo } from "./models";
import { ShoppingListServiceLocal } from "./service.local";

export interface ShoppingListService {
  getItems(): Promise<Item[]>;
  addItem(info: ItemInfo): Promise<Item>;
  removeItem(id: string): Promise<void>;
  checkItem(id: string, checked: boolean): Promise<void>;
  updateItem(id: string, info: ItemInfo): Promise<void>;
}

export class ShoppingListServiceFactory {
  private static shoppingListService: ShoppingListService;

  static get(): ShoppingListService {
    if (!ShoppingListServiceFactory.shoppingListService) {
      ShoppingListServiceFactory.shoppingListService =
        new ShoppingListServiceLocal(window.localStorage);
    }

    return ShoppingListServiceFactory.shoppingListService;
  }
}

export const useShoppingListService = () => {
  return new ShoppingListServiceLocal();
};
