export type Item = {
  id: string;
  info: ItemInfo;
  checked: boolean;
};

export type ItemInfo = {
  name: string;
  quantity?: number;
};
