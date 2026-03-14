import ProductCard from "./ProductCard";
import { Decimal } from "@prisma/client/runtime/index-browser";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: Decimal;
  image: string | null;
  category: {
    name: string;
  };
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
