import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/features/auth/model/selectors";
import { logout } from "@/features/auth/model/auth-slice";
import { selectCartItemsCount } from "@/features/cart/model/selectors";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/shared/ui/language-switcher";
import { ThemeSwitcher } from "@/shared/ui/theme-switcher";

export function AppLayout() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-slate-900 focus:px-3 focus:py-2 focus:text-white"
      >
        {t("a11y.skipToContent")}
      </a>
      <header className="border-b bg-white dark:border-slate-800 dark:bg-slate-900">
        <nav
          aria-label={t("a11y.mainNavigation")}
          className="mx-auto flex max-w-5xl items-center gap-4 p-4"
        >
          <Link to="/">{t("nav.home")}</Link>
          <Link to="/login">{t("nav.login")}</Link>
          {user?.role === "admin" ? (
            <Link to="/admin">{t("nav.admin")}</Link>
          ) : null}
          <Link to="/cart" className="relative">
            {t("nav.cart")}
            {cartItemsCount > 0 ? (
              <span className="ml-2 rounded bg-slate-900 px-2 py-0.5 text-xs text-white">
                {cartItemsCount}
              </span>
            ) : null}
          </Link>
          <Link to="/orders">{t("nav.orders")}</Link>
          {user?.role === "admin" ? (
            <Link to="/admin/orders">{t("nav.adminOrders")}</Link>
          ) : null}

          <div className="ml-auto flex items-center gap-3">
            <ThemeSwitcher />
            <LanguageSwitcher />
            {isAuthenticated && user ? (
              <>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {user.email} ({user.role})
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {t("nav.guest")}
              </span>
            )}
          </div>
        </nav>
      </header>

      <main id="main-content" className="mx-auto max-w-5xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
