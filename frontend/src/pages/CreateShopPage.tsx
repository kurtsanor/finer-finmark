import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/Button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { z } from "zod";
import { useCreateShop } from "../hooks/useCreateShop";

export const createShopSchema = z.object({
  name: z
    .string()
    .min(3, "Shop name must be at least 3 characters")
    .max(100, "Shop name cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Please provide a more detailed shop description"),
});

export type CreateShopFormValues = z.infer<typeof createShopSchema>;

/*
 * CreateShopPage
 * Renders the merchant onboarding storefront form and registers a shop node.
 */

const CreateShopPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateShopFormValues>({
    resolver: zodResolver(createShopSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const createShopMutation = useCreateShop();

  /**
   * Form submission handler for creating a shop storefront.
   * @param data - Validated form values from `react-hook-form`.
   */
  const onSubmit = async (data: CreateShopFormValues) => {
    try {
      const response = await createShopMutation.mutateAsync(data);
      toast("Shop created successfully!");
      console.log(response.data);

      // Redirect to seller center layout because backend asynchronously shifts role to merchant
      setTimeout(() => {
        window.location.href = "/seller-centre/products";
      }, 1500);
    } catch (error: any) {
      toast(
        error.response?.data?.error ||
          "An error occurred while launching your shop",
      );
      console.log("An error occured: ", error.response);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 mt-8">
      {/* Header Segment */}
      <header className="pb-6 border-b border-neutral-200">
        <h2 className="text-xl font-bold tracking-tight text-black">
          Setup Your Storefront
        </h2>
        <p className="text-sm text-neutral-600 mt-1 tracking-tight">
          Complete your shop profile to upgrade your account into a merchant
          node.
        </p>
      </header>

      {/* Main Configuration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        {/* Shop Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-medium text-black">
            Shop Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            disabled={isSubmitting}
            placeholder="e.g., Adidas Official Store"
            className="border border-neutral-200 px-3 py-1.5 tracking-tight bg-neutral-50 rounded outline-none transition-all placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50"
          />
          {errors.name && (
            <span className="text-xs text-red-500 mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Shop Description */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="shopDescription" className="font-medium text-black">
            Shop Description
          </label>
          <textarea
            {...register("description")}
            id="description"
            disabled={isSubmitting}
            placeholder="Describe your shop and the products you offer..."
            rows={3}
            className="border border-neutral-200 px-3 py-1.5 tracking-tight bg-neutral-50 rounded-lg outline-none transition-all placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black resize-none disabled:opacity-50"
          />
          {errors.description && (
            <span className="text-xs text-red-500 mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Form Interactive Action Button */}
        <Button
          isLoading={isSubmitting}
          loadingText="Launching Storefront..."
          className="w-full bg-black hover:bg-neutral-900 rounded text-white px-5 py-2 mt-1 font-semibold tracking-tight transition-colors"
        >
          Launch Storefront Node
        </Button>
      </form>
    </div>
  );
};

export default CreateShopPage;
