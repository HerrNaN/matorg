import { Stack, Text } from "@mantine/core";
import React, { FC } from "react";
import { useCheckItemMutation, useRemoveItemMutation } from "../../api";
import { Item, categories } from "../../models";
import { ShoppingListItem } from "../ShoppingListItem";

export const UncheckedItemsGroup: FC<{ items: Item[] }> = ({ items }) => {
  const [checkItem] = useCheckItemMutation();
  const [removeItem] = useRemoveItemMutation();

  const uncheckedItems = items.filter(({ checked }) => !checked);

  if (uncheckedItems.length === 0) return null;

  return (
    <Stack>
      {[undefined, ...categories].map(
        (category) =>
          uncheckedItems.some((item) => item.info.category === category) && (
            <React.Fragment key={category ?? "uncategorized"}>
              <Text>{category ?? "Uncategorized"}</Text>
              {uncheckedItems
                .filter((item) => item.info.category === category)
                .map((item) => (
                  <ShoppingListItem
                    key={item.id}
                    item={item}
                    onRemove={() => removeItem(item.id)}
                    onClick={() =>
                      checkItem({ id: item.id, checked: !item.checked })
                    }
                  />
                ))}
            </React.Fragment>
          )
      )}
    </Stack>
  );
};
