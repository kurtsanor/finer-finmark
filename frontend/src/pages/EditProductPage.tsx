import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../components/Button";
import {
  type CreateProductFormValues,
  createProductSchema,
} from "../schemas/product";
import { useProduct } from "../hooks/useProduct";
import type { Product } from "../types/product.types";
import { useUpdateProduct } from "../hooks/useUpdateProduct";

interface EditProductFormProps {
  product: Product | undefined;
}

/*
 * EditProductPage
 * Renders a dedicated administrative workspace form for editing existing inventory items.
 */
const EditProductPage = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useProduct(id!);

  console.log(product);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <EditProductForm product={product} />;
};

const EditProductForm = ({ product }: EditProductFormProps) => {
  const navigate = useNavigate();

  const useUpdateProductMutation = useUpdateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    mode: "onSubmit",
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      category: product?.category || "",
    },
  });

  /**
   * Dispatches the validated product update payload to the product-service microservice.
   * @param data - Form validated properties via Zod.
   */
  const onSubmit = async (data: CreateProductFormValues) => {
    try {
      const response = await useUpdateProductMutation.mutateAsync({
        _id: product!._id,
        ...data,
      });
      console.log("Product update response: ", response.data);
      toast.success("Product has been updated!");

      // Navigate cleanly back inventory grid page
      navigate("/seller-centre/products");
    } catch (error: any) {
      toast.error(
        error.response?.data?.error ||
          "Failed to update product in marketplace catalog.",
      );
      console.error("Product update error: ", error.response);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 p-4 sm:p-6 bg-white rounded-xl">
      {/* Structural Management Navigation Breadcrumbs */}
      <nav className="mb-4 text-xs font-semibold text-neutral-500 tracking-tight uppercase flex gap-2">
        <Link
          to="/seller-centre/products"
          className="hover:text-black transition-colors"
        >
          Products
        </Link>
        <span>/</span>
        <span className="text-black">Edit Product</span>
      </nav>

      {/* Header Segment */}
      <header className="pb-6 border-b border-neutral-200">
        <h1 className="text-2xl font-bold tracking-tight text-black">
          Edit Product
        </h1>
        <p className="text-sm text-neutral-600 mt-1 tracking-tight">
          Update the details of your inventory item in the public marketplace
          storefront catalog.
        </p>
      </header>

      {/* Main Creation Form Configuration */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        {/* Input 1: Product Title */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-medium text-black">
            Product Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            maxLength={150}
            disabled={isSubmitting}
            placeholder="e.g., FIFA World Cup 26™ Trionda Host Nation League Soccer Ball"
            className="border border-neutral-200 px-3 py-1.5 tracking-tight bg-neutral-50 rounded outline-none transition-all placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50"
          />
          {errors.name && (
            <span className="text-xs text-red-500 mt-1">
              {errors.name.message}
            </span>
          )}
          <p className="text-xs text-neutral-400 tracking-tight">
            Include keywords that buyers use when searching for your item
            (Brand, Model, Type).
          </p>
        </div>

        {/* Horizontal Dual-Field Form Matrix (Price & Category) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Unit Price */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="price" className="font-medium text-black">
              Price (PHP)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-neutral-400 font-medium select-none">
                ₱
              </span>
              <input
                {...register("price", { valueAsNumber: true })}
                id="price"
                type="number"
                step="0.01"
                min="0.01"
                max="10000000"
                disabled={isSubmitting}
                placeholder="0.00"
                className="w-full border border-neutral-200 pl-8 pr-3 py-1.5 tracking-tight bg-neutral-50 rounded outline-none transition-all placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50 "
              />
            </div>
            {errors.price && (
              <span className="text-xs text-red-500 mt-1">
                {errors.price.message}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="category" className="font-medium text-black">
              Category
            </label>
            <input
              {...register("category")}
              id="category"
              type="text"
              maxLength={100}
              disabled={isSubmitting}
              placeholder="e.g., Electronics, Clothing, Home & Garden"
              className="border border-neutral-200 px-3 py-1.5 tracking-tight bg-neutral-50 rounded outline-none transition-all placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50"
            />
            {errors.category && (
              <span className="text-xs text-red-500 mt-1">
                {errors.category.message}
              </span>
            )}
          </div>
        </div>

        {/* Input 4: Product Specifications & Long Copy Description */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="font-medium text-black">
            Product Description
          </label>
          <textarea
            {...register("description")}
            id="description"
            maxLength={2000}
            disabled={isSubmitting}
            placeholder="Outline physical material compositions, sizing specs, package inclusions, and delivery fulfillment standards..."
            rows={6}
            className="border border-neutral-200 px-3 py-1.5 tracking-tight bg-neutral-50 rounded outline-none transition-all placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black resize-none disabled:opacity-50"
          />
          {errors.description && (
            <span className="text-xs text-red-500 mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Dynamic Action Controls Segment */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-200">
          {/* Cancel button to return safely to product list dashboard */}
          <Link
            to="/seller-centre/products"
            className="px-4 py-2 font-semibold text-neutral-700 bg-white border border-neutral-200 rounded hover:bg-neutral-50 active:scale-[0.99] transition-all tracking-tight"
          >
            Cancel
          </Link>

          {/* Core Submission Trigger using your global customized Button component */}
          <Button
            isLoading={isSubmitting}
            loadingText="Publishing Item..."
            className="bg-black hover:bg-neutral-900 text-white px-5 py-2 rounded font-semibold tracking-tight transition-colors"
          >
            Update Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
