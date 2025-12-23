import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", Number(price));
      productData.append("category", category);
      productData.append("quantity", Number(quantity));
      productData.append("brand", brand);
      productData.append("countInStock", Number(stock));

      const  data  = await createProduct(productData).unwrap();

      if (data.error) {
        toast.error("Product creation failed, Try Again.");
      } else {
        toast.success(`${data.name} is created. `);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed in backend, Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Pass the formData instance you created
      const res = await uploadProductImage(formData).unwrap();
      console.log(res);
      
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="md:ml-16">
      <div className="flex flex-col md:flex-row p-4">
        <AdminMenu />

        <div className="md:w-3/4">
          <div className="text-4xl font-bold mb-6">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                name="image"
                alt="product"
                className="mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 hover:text-gray-500 duratin-300">
              {image ? image.name : "Upload Image"}

              <input
                type="text"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="py-3 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="one w-[45%]">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  name="name"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="two w-[45%] ">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  name="price"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="one w-[45%]">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  name="quantity"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="two w-[45%]">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  name="brand"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label className="my-2">Description</label>
            <textarea
              type="text"
              name="description"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-full text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex items-center justify-between">
              <div className="w-[45%]">
                <label htmlFor="name block">Count In Stock</label>
                <br />
                <input
                  type="text"
                  name="countInStock"
                  className="p-4 mb-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="w-[45%]">
                <label htmlFor="">Category</label>
                <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-full border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
            type="submit"
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-500 cursor-pointer hover:bg-pink-600"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
