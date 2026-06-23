import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./Button";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const schema = z
  .object({
    email: z.string().trim().email("Enter a valid email address"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z.string().min(3, "Confirm your password"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

type Props = {
  onClose: () => void;
};

const ResetPasswordModal = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async ({ email, password }: FormValues) => {
    try {
      await axiosInstance.post("/api/auth/reset-password", { email, password });
      toast.success("Password reset successfully! You can now sign in.");
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "No account found with that email.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-neutral-200 w-full max-w-sm p-5 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold tracking-tight">Reset password</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-black transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>
        <p className="text-sm text-neutral-500 mb-4">
          Enter your email and a new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              {...register("email")}
              disabled={isSubmitting}
              type="email"
              placeholder="you@example.com"
              className="border border-neutral-200 px-3 py-1.5 text-sm bg-neutral-50"
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">New password</label>
            <input
              {...register("password")}
              disabled={isSubmitting}
              type="password"
              placeholder="New password"
              className="border border-neutral-200 px-3 py-1.5 text-sm bg-neutral-50"
            />
            {errors.password && (
              <span className="text-xs text-red-500 mt-1">{errors.password.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Confirm new password</label>
            <input
              {...register("confirmPassword")}
              disabled={isSubmitting}
              type="password"
              placeholder="Confirm new password"
              className="border border-neutral-200 px-3 py-1.5 text-sm bg-neutral-50"
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</span>
            )}
          </div>

          <Button
            isLoading={isSubmitting}
            loadingText="Resetting..."
            className="bg-black hover:bg-neutral-900 text-white p-1.5 mt-1 tracking-tight transition-colors"
          >
            Reset password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
