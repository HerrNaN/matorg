import { css } from "@emotion/react";
import { Stack } from "@mantine/core";
import { FC } from "react";
import { Provider } from "react-redux";
import { AddShoppingListItem } from "./AddShoppingListItem";
import { ShoppingList } from "./ShoppingList";
import { shoppingListStore } from "../store";

export const ShoppingListPage: FC<{ className?: string }> = ({ className }) => (
  <Provider store={shoppingListStore}>
    <Stack className={className} gap={0}>
      <ShoppingList
        css={css({
          flexGrow: 1,
          paddingTop: "var(--mantine-spacing-sm)",
        })}
      />
      <AddShoppingListItem
        css={css({
          justifySelf: "end",
        })}
      />
    </Stack>
  </Provider>
);
