import { css } from "@emotion/react";
import {
  Button,
  Card,
  Checkbox,
  CloseButton,
  FocusTrap,
  Group,
  Modal,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import { useUpdateItemMutation } from "../api";
import { Item, ItemInfo, categories } from "../models";

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
          <FocusTrap active>
            <TextInput
              data-autofocus
              withAsterisk
              label="Name"
              {...form.getInputProps<string>("name")}
            />
            <NumberInput
              label="Quantity"
              min={0}
              {...form.getInputProps("quantity")}
            />
            <Select
              label="Category"
              data={categories.slice()}
              {...form.getInputProps("category")}
            />
          </FocusTrap>
          <Group justify="flex-end" mt="sm">
            <Button disabled={!form.isDirty()} type={"submit"}>
              Save
            </Button>
          </Group>
        </form>
      </Modal>
      <Card
        shadow={"sm"}
        onClick={openModal}
        py={"xs"}
        css={css({
          userSelect: "none",
          backgroundColor: item.checked ? "#EFFEE7" : undefined,
        })}
      >
        <Group align="center">
          <Checkbox
            aria-labelledby="itemLabel"
            checked={item.checked}
            onChange={onClick}
            onClick={(e) => e.stopPropagation()}
            color={item.checked ? "green" : undefined}
          />
          <Text size="sm" id={"itemLabel"} css={css({ flexGrow: 1 })}>
            {item.info.quantity ? `${item.info.quantity} pcs ` : ""}
            {item.info.name}
          </Text>
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
