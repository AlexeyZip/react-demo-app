import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  clearCart,
  removeItem,
  setQuantity,
} from "@/features/cart/model/cart-slice";
import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotalPrice,
} from "@/features/cart/model/selectors";
import { EmptyState } from "@/shared/ui/empty-state";
import { Link } from "react-router-dom";

export function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const itemsCount = useAppSelector(selectCartItemsCount);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  if (!items.length) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add products from the catalog to see them here."
      />
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cart</h1>
        <button
          type="button"
          className="rounded bg-rose-600 px-4 py-2 text-white"
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <article
            key={item.productId}
            className="flex items-center gap-4 rounded-lg border bg-white p-4"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-16 w-16 rounded object-cover"
            />

            <div className="min-w-0 flex-1">
              <h2 className="truncate font-semibold">{item.title}</h2>
              <p className="text-sm text-slate-600">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded border px-3 py-1"
                onClick={() =>
                  dispatch(
                    setQuantity({
                      productId: item.productId,
                      quantity: item.quantity - 1,
                    }),
                  )
                }
              >
                -
              </button>
              <span className="min-w-6 text-center">{item.quantity}</span>
              <button
                type="button"
                className="rounded border px-3 py-1"
                onClick={() =>
                  dispatch(
                    setQuantity({
                      productId: item.productId,
                      quantity: item.quantity + 1,
                    }),
                  )
                }
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="rounded bg-slate-900 px-3 py-1.5 text-white"
              onClick={() => dispatch(removeItem(item.productId))}
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <div className="rounded-lg border bg-white p-4">
        <p className="text-sm text-slate-600">Items: {itemsCount}</p>
        <p className="mt-1 text-lg font-bold">
          Total: ${totalPrice.toFixed(2)}
          <div className="mt-3">
            <Link
              to="/checkout"
              className="inline-block rounded bg-slate-900 px-4 py-2 text-white"
            >
              Proceed to checkout
            </Link>
          </div>
        </p>
      </div>
    </section>
  );
}
