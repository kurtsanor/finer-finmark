import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <section className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-slate-900">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-600">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/shop"
          className="inline-flex items-center justify-center mt-8 px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-slate-800 transition-colors"
        >
          Go to Shop
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
