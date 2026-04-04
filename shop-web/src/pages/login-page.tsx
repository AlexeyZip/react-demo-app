import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/app/store/hooks";
import { login } from "@/features/auth/model/auth-slice";
import { loginRequest } from "@/features/auth/api/login";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/model/login-schema";
import { useTranslation } from "react-i18next";

export function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: loginRequest,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginFormValues) => {
    const response = await loginMutation.mutateAsync(values);
    dispatch(login(response));
    navigate(response.user.role === "admin" ? "/admin" : "/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md space-y-4 rounded bg-white p-6 shadow dark:border dark:border-slate-800 dark:bg-slate-900"
      noValidate
    >
      <h1 className="text-2xl font-bold">{t("login.title")}</h1>

      <div>
        <label htmlFor="login-email" className="mb-1 block text-sm font-medium">
          {t("login.email")}
        </label>
        <input
          id="login-email"
          className="w-full rounded border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          type="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "login-email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p id="login-email-error" className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="login-password" className="mb-1 block text-sm font-medium">
          {t("login.password")}
        </label>
        <input
          id="login-password"
          className="w-full rounded border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          type="password"
          placeholder="******"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "login-password-error" : undefined}
          {...register("password")}
        />
        {errors.password ? (
          <p id="login-password-error" className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      {loginMutation.isError ? (
        <p
          role="alert"
          className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
        >
          {loginMutation.error.message}
        </p>
      ) : null}

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
        <p>{t("login.demoUser")}</p>
        <p>{t("login.demoAdmin")}</p>
      </div>

      <button
        className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-60"
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? t("login.submitting") : t("login.submit")}
      </button>
    </form>
  );
}
