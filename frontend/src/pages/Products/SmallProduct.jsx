import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="p-4">
      <div className="p-1 rounded-md bg-linear-to-t from-violet-500 to-fuchsia-500 hover:scale-101 hover:shadow-lg hover:shadow-pink-500/50 duration-300 cursor-pointer">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-74 w-[35rem] rounded"
          />
          <HeartIcon product={product} />
        </div>

        <div className="mt-1 p-2 rounded  bg-fuchsia-700">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center">
              <div className="text-lg font-semibold">{product.name}</div>
              <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                ${product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
