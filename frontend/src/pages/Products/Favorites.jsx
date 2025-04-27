import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="p-3">
      <h1 className="text-4xl font-semibold mb-10 bg-black p-4 rounded-md">
        FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap gap-6 px-6">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
