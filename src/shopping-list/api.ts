import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item, ItemInfo } from "./models";
import { ShoppingListServiceFactory } from "./service";

export const shoppingListApi = createApi({
  baseQuery: fakeBaseQuery<Error>(),
  tagTypes: ["items"],
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      providesTags: ["items"],
      queryFn: async () => {
        try {
          return { data: await ShoppingListServiceFactory.get().getItems() };
        } catch (error) {
          if (error instanceof Error) {
            return { error };
          }
          throw error;
        }
      },
    }),
    addItem: builder.mutation<Item, ItemInfo>({
      invalidatesTags: ["items"],
      queryFn: async (info) => {
        try {
          return { data: await ShoppingListServiceFactory.get().addItem(info) };
        } catch (error) {
          if (error instanceof Error) {
            return { error };
          }
          throw error;
        }
      },
    }),
    removeItem: builder.mutation<void, Item["id"]>({
      queryFn: async (id) => {
        try {
          await ShoppingListServiceFactory.get().removeItem(id);
          return { data: undefined };
        } catch (error) {
          if (error instanceof Error) {
            return { error };
          }
          throw error;
        }
      },
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          shoppingListApi.util.updateQueryData(
            "getItems",
            undefined,
            (draft) => {
              const index = draft.findIndex((item) => item.id === id);
              if (index !== -1) {
                draft.splice(index, 1);
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
    checkItem: builder.mutation<void, { id: Item["id"]; checked: boolean }>({
      queryFn: async ({ id, checked }) => {
        try {
          await ShoppingListServiceFactory.get().checkItem(id, checked);
          return { data: undefined };
        } catch (error) {
          if (error instanceof Error) {
            return { error };
          }
          throw error;
        }
      },
      onQueryStarted: async ({ id, checked }, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          shoppingListApi.util.updateQueryData(
            "getItems",
            undefined,
            (draft) => {
              const item = draft.find((item) => item.id === id);
              if (item) {
                item.checked = checked;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
    updateItem: builder.mutation<void, { id: Item["id"]; info: ItemInfo }>({
      queryFn: async ({ id, info }) => {
        try {
          await ShoppingListServiceFactory.get().updateItem(id, info);
          return { data: undefined };
        } catch (error) {
          if (error instanceof Error) {
            return { error };
          }
          throw error;
        }
      },
      onQueryStarted: async ({ id, info }, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          shoppingListApi.util.updateQueryData(
            "getItems",
            undefined,
            (draft) => {
              const item = draft.find((item) => item.id === id);
              if (item) {
                item.info = info;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
    removeItems: builder.mutation<void, Item["id"][]>({
      queryFn: async (ids) => {
        try {
          await ShoppingListServiceFactory.get().removeItems(ids);
          return { data: undefined };
        } catch (error) {
          if (error instanceof Error) {
            return { error };
          }
          throw error;
        }
      },
      onQueryStarted: async (ids, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          shoppingListApi.util.updateQueryData(
            "getItems",
            undefined,
            (draft) => {
              ids.forEach((id) => {
                const index = draft.findIndex((item) => item.id === id);
                if (index !== -1) {
                  draft.splice(index, 1);
                }
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useRemoveItemMutation,
  useRemoveItemsMutation,
  useCheckItemMutation,
  useUpdateItemMutation,
} = shoppingListApi;
