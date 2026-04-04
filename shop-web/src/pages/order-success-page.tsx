import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function OrderSuccessPage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const suffix = orderId ? `: ${orderId}` : "";

  return (
    <section className="space-y-4 rounded-lg border bg-white p-6">
      <h1 className="text-2xl font-bold">{t("orderSuccess.title")}</h1>
      <p className="text-slate-700">
        {t("orderSuccess.description", { suffix })}
      </p>
      <div className="flex gap-3">
        <Link className="rounded bg-slate-900 px-4 py-2 text-white" to="/">
          {t("orderSuccess.backToCatalog")}
        </Link>
        <Link className="rounded border px-4 py-2" to="/cart">
          {t("orderSuccess.goToCart")}
        </Link>
      </div>
    </section>
  );
}
