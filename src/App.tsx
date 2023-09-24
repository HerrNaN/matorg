import { css } from "@emotion/react";
import "@mantine/core/styles.css";
import { FC } from "react";
import { ShoppingListPage } from "./shopping-list/components/ShoppingListPage";

export const App: FC = () => {
  return (
    <ShoppingListPage
      css={css({
        width: "100vw",
        height: "100vh",
      })}
    />
  );
};
