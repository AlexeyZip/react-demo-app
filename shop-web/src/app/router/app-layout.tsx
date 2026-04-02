import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/features/auth/model/selectors";
import { logout } from "@/features/auth/model/auth-slice";

export function AppLayout() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-5xl items-center gap-4 p-4">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/admin">Admin</Link>

          <div className="ml-auto flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <span className="text-sm text-slate-600">
                  {user.email} ({user.role})
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <span className="text-sm text-slate-500">Guest</span>
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
