import { Link, useSearchParams } from "react-router-dom";

export function OrderSuccessPage() {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <section className="space-y-4 rounded-lg border bg-white p-6">
      <h1 className="text-2xl font-bold">Order placed successfully</h1>
      <p className="text-slate-700">
        Your order has been created{orderId ? `: ${orderId}` : ""}.
      </p>
      <div className="flex gap-3">
        <Link className="rounded bg-slate-900 px-4 py-2 text-white" to="/">
          Back to catalog
        </Link>
        <Link className="rounded border px-4 py-2" to="/cart">
          Go to cart
        </Link>
      </div>
    </section>
  );
}
