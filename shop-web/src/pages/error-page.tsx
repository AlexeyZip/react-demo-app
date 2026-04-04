import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function ErrorPage() {
  const { t } = useTranslation();
  const error = useRouteError();

  let title = t("errorPage.unexpectedTitle");
  let message = t("errorPage.unexpectedMessage");

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;
    message = error.statusText || message;
  }

  return (
    <section className="rounded-lg border bg-white p-6 space-y-3 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-slate-600 dark:text-slate-300">{message}</p>
      <Link
        to="/"
        className="inline-block rounded bg-slate-900 px-4 py-2 text-white"
      >
        {t("errorPage.backHome")}
      </Link>
    </section>
  );
}
