import { css } from "@emotion/react";
import { Box, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { useAddItemMutation } from "../api";

export const AddShoppingListItem: FC<{ className?: string }> = ({
  className,
}) => {
  const [addItem] = useAddItemMutation();
  const [itemName, setItemName] = useState("");

  return (
    <Box
      css={css({
        zIndex: 1,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      })}
      className={className}
      p={"sm"}
    >
      <TextInput
        size="md"
        px={"sm"}
        variant="unstyled"
        radius={0}
        onKeyUp={async (e) => {
          if (e.key === "Enter") {
            await addItem({ name: itemName });
            setItemName("");
          }
        }}
        onChange={(e) => setItemName(e.currentTarget.value)}
        value={itemName}
        css={css({
          flexGrow: 1,
        })}
      />
    </Box>
  );
};
