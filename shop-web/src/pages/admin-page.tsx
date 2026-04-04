import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductsQuery } from "@/features/products/model/use-products-query";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  type UpsertProductPayload,
} from "@/features/admin-products/api/admin-products";
import {
  productFormSchema,
  type ProductFormValues,
} from "@/features/admin-products/model/product-form-schema";
import type { Product } from "@/entities/product";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const defaultValues: ProductFormValues = {
  title: "",
  description: "",
  price: 1,
  imageUrl: "",
  category: "",
  inStock: true,
};

export function AdminPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data, isPending, isError, error } = useProductsQuery({
    q: "",
    category: "",
    page: 1,
    limit: 100,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset(defaultValues);
      toast.success(t("adminProducts.createdToast"));
    },
    onError: () => {
      toast.error(t("adminProducts.createFailedToast"));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpsertProductPayload;
    }) => updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingProduct(null);
      reset(defaultValues);
      toast.success(t("adminProducts.updatedToast"));
    },
    onError: () => {
      toast.error(t("adminProducts.updateFailedToast"));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(t("adminProducts.deletedToast"));
    },
    onError: () => {
      toast.error(t("adminProducts.deleteFailedToast"));
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, payload: values });
      return;
    }

    createMutation.mutate(values);
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    reset({
      title: product.title,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      inStock: product.inStock,
    });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    reset(defaultValues);
  };

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">{t("adminProducts.title")}</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 rounded-lg border bg-white p-4"
      >
        <input
          className="rounded border px-3 py-2"
          placeholder={t("adminProducts.placeholderTitle")}
          {...register("title")}
        />
        {errors.title ? (
          <p className="text-sm text-rose-600">{errors.title.message}</p>
        ) : null}

        <textarea
          className="rounded border px-3 py-2"
          placeholder={t("adminProducts.placeholderDescription")}
          {...register("description")}
        />
        {errors.description ? (
          <p className="text-sm text-rose-600">{errors.description.message}</p>
        ) : null}

        <input
          className="rounded border px-3 py-2"
          type="number"
          step="0.01"
          placeholder={t("adminProducts.placeholderPrice")}
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price ? (
          <p className="text-sm text-rose-600">{errors.price.message}</p>
        ) : null}

        <input
          className="rounded border px-3 py-2"
          placeholder={t("adminProducts.placeholderImageUrl")}
          {...register("imageUrl")}
        />
        {errors.imageUrl ? (
          <p className="text-sm text-rose-600">{errors.imageUrl.message}</p>
        ) : null}

        <input
          className="rounded border px-3 py-2"
          placeholder={t("adminProducts.placeholderCategory")}
          {...register("category")}
        />
        {errors.category ? (
          <p className="text-sm text-rose-600">{errors.category.message}</p>
        ) : null}

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("inStock")} />
          {t("adminProducts.inStock")}
        </label>

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded bg-slate-900 px-4 py-2 text-white"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {editingProduct ? t("adminProducts.update") : t("adminProducts.create")}
          </button>

          {editingProduct ? (
            <button
              type="button"
              className="rounded border px-4 py-2"
              onClick={cancelEditing}
            >
              {t("adminProducts.cancelEdit")}
            </button>
          ) : null}
        </div>
      </form>

      {isPending ? <p>{t("adminProducts.loading")}</p> : null}
      {isError ? (
        <p className="rounded border border-rose-200 bg-rose-50 p-3 text-rose-700">
          {t("adminProducts.loadError", { message: error.message })}
        </p>
      ) : null}

      {!isPending && !isError ? (
        <div className="space-y-2">
          {data?.items.map((product) => (
            <article
              key={product.id}
              className="flex items-center justify-between rounded border bg-white p-3"
            >
              <div>
                <p className="font-semibold">{product.title}</p>
                <p className="text-sm text-slate-600">
                  ${product.price.toFixed(2)} - {product.category}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded border px-3 py-1.5"
                  onClick={() => startEditing(product)}
                >
                  {t("adminProducts.edit")}
                </button>

                <button
                  type="button"
                  className="rounded bg-rose-600 px-3 py-1.5 text-white"
                  onClick={() => deleteMutation.mutate(product.id)}
                  disabled={deleteMutation.isPending}
                >
                  {t("adminProducts.delete")}
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
