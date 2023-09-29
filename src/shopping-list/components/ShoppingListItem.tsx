import { css } from "@emotion/react";
import {
  Button,
  Card,
  Checkbox,
  CloseButton,
  Group,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import { useUpdateItemMutation } from "../api";
import { Item, ItemInfo } from "../models";

export const ShoppingListItem: FC<{
  item: Item;
  onRemove: () => void;
  onClick: () => void;
}> = ({ item, onRemove, onClick }) => {
  const [updateItem] = useUpdateItemMutation();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<ItemInfo>({
    initialValues: {
      name: item.info.name,
      quantity: item.info.quantity,
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "Name must be at least 3 characters long" : null,
      quantity: (value) =>
        value !== undefined && value < 0 ? "Quantity must be positive" : null,
    },
  });

  const openModal = () => {
    form.reset();
    open();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit Item" centered>
        <form
          onSubmit={form.onSubmit(async (values) => {
            await updateItem({ id: item.id, info: values });
            close();
          })}
        >
          <TextInput
            withAsterisk
            label="Name"
            {...form.getInputProps<string>("name")}
          />
          <NumberInput
            label="Quantity"
            min={0}
            {...form.getInputProps("quantity")}
          />
          <Group justify="flex-end" mt="sm">
            <Button type={"submit"}>Submit</Button>
          </Group>
        </form>
      </Modal>
      <Card shadow={"sm"} onClick={openModal}>
        <Group align="center">
          <Checkbox
            aria-labelledby="itemLabel"
            checked={item.checked}
            onChange={onClick}
            onClick={(e) => e.stopPropagation()}
          />
          <label id={"itemLabel"} css={css({ flexGrow: 1 })}>
            {item.info.name}
          </label>
          <CloseButton
            aria-label={`close ${item.info.name}`}
            onClick={(e) => {
              onRemove();
              e.stopPropagation();
            }}
          />
        </Group>
      </Card>
    </>
  );
};
