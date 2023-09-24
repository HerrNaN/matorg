import { ScrollArea, Stack } from "@mantine/core";
import { FC } from "react";
import { ShoppingListItem } from "./ShoppingListItem";
import {
  useCheckItemMutation,
  useGetItemsQuery,
  useRemoveItemMutation,
} from "../api";

export const ShoppingList: FC<{ className?: string }> = ({ className }) => {
  const { data, isFetching, error } = useGetItemsQuery();
  const [removeItem] = useRemoveItemMutation();
  const [checkItem] = useCheckItemMutation();

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <ScrollArea className={className}>
      <Stack gap={"sm"} px={"sm"}>
        {data.map((item) => (
          <ShoppingListItem
            key={item.id}
            item={item}
            onRemove={() => removeItem(item.id)}
            onClick={() => checkItem({ id: item.id, checked: !item.checked })}
          />
        ))}
      </Stack>
    </ScrollArea>
  );
};
