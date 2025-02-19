import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { add, remove } from "../redux/Slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProductInfo = () => {
  const { id } = useParams();
  const API_URL = `https://fakestoreapi.com/products/${id}`;
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const dispatch = useDispatch();

  // Now access the cart array directly
  const cart = useSelector((state) => state.cart); // It's just an array now

  // Check if the product is in the cart
  const productInCart = post ? cart.some((item) => item.id === post.id) : false;

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  };

  async function fetchProductData() {
    setLoading(true);

    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPost(data);
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
      setPost(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, [id,fetchProductData]);

  if (loading)
    return (
      <div className="flex items-center justify-center py-10 text-white h-screen">
        Loading...
      </div>
    );

  if (!post)
    return (
      <div className="text-center py-10 text-white">Product not found</div>
    );

  return (
    <div className="min-h-screen bg-gray-700 text-white p-6">
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 shadow-lg rounded-lg mt-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="flex-1">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-100">
              {post.title}
            </h1>
            <p className="mt-2 text-lg text-gray-300">{post.description}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-2xl font-bold text-green-400">
                ${post.price}
              </span>

              {/* Conditional Button */}
              {productInCart ? (
                <button
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  onClick={removeFromCart}
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
