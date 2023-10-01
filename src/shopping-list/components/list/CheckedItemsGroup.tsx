import { css } from "@emotion/react";
import { Button, Group, Stack, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";
import {
  useCheckItemMutation,
  useRemoveItemMutation,
  useRemoveItemsMutation,
} from "../../api";
import { Item } from "../../models";
import { ShoppingListItem } from "../ShoppingListItem";

export const CheckedItemsGroup: FC<{ items: Item[] }> = ({ items }) => {
  const [checkItem] = useCheckItemMutation();
  const [removeItem] = useRemoveItemMutation();
  const [removeItems] = useRemoveItemsMutation();

  const checkedItems = items.filter(({ checked }) => checked);

  return (
    <Stack gap={"sm"}>
      <Group>
        <Text
          size="md"
          fw={700}
          tt="uppercase"
          css={css({
            flexGrow: 1,
          })}
        >
          Checked
        </Text>
        <Button
          leftSection={<IconTrash size={18} />}
          variant="subtle"
          color="red"
          onClick={() => {
            removeItems(checkedItems.map(({ id }) => id));
          }}
        >
          Remove all
        </Button>
      </Group>
      {checkedItems.map((item) => (
        <ShoppingListItem
          key={item.id}
          item={item}
          onRemove={() => removeItem(item.id)}
          onClick={() => checkItem({ id: item.id, checked: !item.checked })}
        />
      ))}
    </Stack>
  );
};
