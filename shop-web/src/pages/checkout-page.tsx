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
import { useQueryClient } from "@tanstack/react-query";

export function CheckoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const queryClient = useQueryClient();

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
    const response = await mutation.mutateAsync({
      customer: values,
      items,
      totalPrice,
    });

    dispatch(clearCart());
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    navigate(`/order-success?orderId=${response.id}`);
  };

  if (!items.length) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add products before proceeding to checkout."
      />
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 rounded-lg border bg-white p-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Full name</label>
          <input
            className="w-full rounded border px-3 py-2"
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p className="mt-1 text-sm text-rose-600">
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            className="w-full rounded border px-3 py-2"
            {...register("email")}
          />
          {errors.email ? (
            <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Address</label>
          <input
            className="w-full rounded border px-3 py-2"
            {...register("address")}
          />
          {errors.address ? (
            <p className="mt-1 text-sm text-rose-600">
              {errors.address.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">City</label>
            <input
              className="w-full rounded border px-3 py-2"
              {...register("city")}
            />
            {errors.city ? (
              <p className="mt-1 text-sm text-rose-600">
                {errors.city.message}
              </p>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Postal code
            </label>
            <input
              className="w-full rounded border px-3 py-2"
              {...register("postalCode")}
            />
            {errors.postalCode ? (
              <p className="mt-1 text-sm text-rose-600">
                {errors.postalCode.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="rounded bg-slate-50 p-3 text-sm text-slate-700">
          Total: <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>

        {mutation.isError ? (
          <p className="rounded border border-rose-200 bg-rose-50 p-3 text-rose-700">
            {mutation.error.message}
          </p>
        ) : null}

        <button
          type="submit"
          className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Placing order..." : "Place order"}
        </button>
      </form>
    </section>
  );
}
