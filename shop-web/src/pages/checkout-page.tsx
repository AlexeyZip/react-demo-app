import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { clearCart } from "@/features/cart/model/cart-slice";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "@/features/cart/model/selectors";
import {
  checkoutSchema,
  type CheckoutSchemaValues,
} from "@/features/checkout/model/checkout-schema";
import { createOrder } from "@/features/checkout/api/create-order";
import { EmptyState } from "@/shared/ui/empty-state";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function CheckoutPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutSchemaValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    },
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: createOrder,
  });

  const onSubmit = async (values: CheckoutSchemaValues) => {
    try {
      const response = await mutation.mutateAsync({
        customer: values,
        items,
        totalPrice,
      });

      dispatch(clearCart());
      toast.success(t("checkout.orderPlaced"));
      navigate(`/order-success?orderId=${response.id}`);
    } catch {
      toast.error(t("checkout.placeOrderFailed"));
    }
  };

  if (!items.length) {
    return (
      <EmptyState
        title={t("checkout.emptyTitle")}
        description={t("checkout.emptyDescription")}
      />
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">{t("checkout.title")}</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <div>
          <label htmlFor="checkout-full-name" className="mb-1 block text-sm font-medium">
            {t("checkout.fullName")}
          </label>
          <input
            id="checkout-full-name"
            className="w-full rounded border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "checkout-full-name-error" : undefined}
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p id="checkout-full-name-error" className="mt-1 text-sm text-rose-600">
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="checkout-email" className="mb-1 block text-sm font-medium">
            {t("checkout.email")}
          </label>
          <input
            id="checkout-email"
            className="w-full rounded border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "checkout-email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id="checkout-email-error" className="mt-1 text-sm text-rose-600">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="checkout-address" className="mb-1 block text-sm font-medium">
            {t("checkout.address")}
          </label>
          <input
            id="checkout-address"
            className="w-full rounded border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? "checkout-address-error" : undefined}
            {...register("address")}
          />
          {errors.address ? (
            <p id="checkout-address-error" className="mt-1 text-sm text-rose-600">
              {errors.address.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="checkout-city" className="mb-1 block text-sm font-medium">
              {t("checkout.city")}
            </label>
            <input
              id="checkout-city"
              className="w-full rounded border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? "checkout-city-error" : undefined}
              {...register("city")}
            />
            {errors.city ? (
              <p id="checkout-city-error" className="mt-1 text-sm text-rose-600">
                {errors.city.message}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="checkout-postal-code" className="mb-1 block text-sm font-medium">
              {t("checkout.postalCode")}
            </label>
            <input
              id="checkout-postal-code"
              className="w-full rounded border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              aria-invalid={Boolean(errors.postalCode)}
              aria-describedby={errors.postalCode ? "checkout-postal-code-error" : undefined}
              {...register("postalCode")}
            />
            {errors.postalCode ? (
              <p id="checkout-postal-code-error" className="mt-1 text-sm text-rose-600">
                {errors.postalCode.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="rounded bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-300">
          {t("cart.total", { value: totalPrice.toFixed(2) })}
        </div>

        {mutation.isError ? (
          <p
            role="alert"
            className="rounded border border-rose-200 bg-rose-50 p-3 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
          >
            {mutation.error.message}
          </p>
        ) : null}

        <button
          type="submit"
          className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? t("checkout.placingOrder") : t("checkout.placeOrder")}
        </button>
      </form>
    </section>
  );
}
