import { ScrollArea, Stack, Title } from "@mantine/core";
import React, { FC } from "react";
import {
  useCheckItemMutation,
  useGetItemsQuery,
  useRemoveItemMutation,
} from "../../api";
import { categories } from "../../models";
import { ShoppingListItem } from "../ShoppingListItem";
import { CheckedItemsGroup } from "./CheckedItemsGroup";
import { UncheckedItemsGroup } from "./UncheckedItemsGroup";

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
        {data.some((item) => !item.checked) && (
          <UncheckedItemsGroup items={data} />
        )}
        {data.some((item) => item.checked) && (
          <CheckedItemsGroup items={data} />
        )}
      </Stack>
    </ScrollArea>
  );
};
