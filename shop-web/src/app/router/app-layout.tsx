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

export function AppLayout() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-5xl items-center gap-4 p-4">
          <Link to="/">{t("nav.home")}</Link>
          <Link to="/login">{t("nav.login")}</Link>
          {user?.role === "admin" ? <Link to="/admin">{t("nav.admin")}</Link> : null}
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
            <LanguageSwitcher />
            {isAuthenticated && user ? (
              <>
                <span className="text-sm text-slate-600">
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
              <span className="text-sm text-slate-500">{t("nav.guest")}</span>
            )}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
