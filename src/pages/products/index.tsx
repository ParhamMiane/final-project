import { useEffect } from "react";
import DsLoading from "../../components/design-system/DsLoading";
import { useProductStore } from "../../stores/products.store";
import ProductRow from "./components/ProductRow";

const Products = () => {
  const { products, isLoading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) {
    return <DsLoading />;
  }
  if (error) return <div className="p-4 text-red-500 font-bold text-center">ERROR: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductRow key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Products;