import { Card, Checkbox, CloseButton, Group } from "@mantine/core";
import { FC } from "react";
import { css } from "@emotion/react";
import { Item } from "../models";

export const ShoppingListItem: FC<{
  item: Item;
  onRemove: () => void;
  onClick: () => void;
}> = ({ item, onRemove, onClick }) => (
  <Card shadow={"sm"}>
    <Group>
      <Checkbox
        css={css({ flexGrow: 1 })}
        label={item.info.name}
        checked={item.checked}
        onChange={onClick}
      />
      <CloseButton onClick={onRemove} />
    </Group>
  </Card>
);
