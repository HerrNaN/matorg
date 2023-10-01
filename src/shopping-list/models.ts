export type Item = {
  id: string;
  info: ItemInfo;
  checked: boolean;
};

export type ItemInfo = {
  name: string;
  quantity?: number;
  category?: Category;
};

export type Category = (typeof categories)[number];

export const categories = [
  "Bakery",
  "Dairy",
  "Meat",
  "Pantry",
  "Household",
  "Health and Beauty",
  "Beverages",
  "Fruits and Vegetables",
  "Frozen",
  "Snacks",
] as const;
