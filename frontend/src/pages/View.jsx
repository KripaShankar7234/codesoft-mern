import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state;

  const [selectedimg, setSelectedImg] = useState(
    product?.thumbnail || ""
  );
  const [moreDetail, setMoreDetail] = useState(false);

  // ✅ SAFETY CHECK
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="mb-4 text-red-500">
          Product data not found
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <nav className="mb-8 text-gray-300">
          <Link to="/" className="hover:text-pink-400">Home</Link>
          {" / "}
          <span className="text-pink-400">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Image */}
          <div className="bg-white/10 p-6 rounded-xl">
            <img
              src={selectedimg || product.thumbnail}
              alt={product.title}
              className="max-h-96 mx-auto"
            />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="h-20 cursor-pointer"
                  onClick={() => setSelectedImg(img)}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-white/10 p-6 rounded-xl text-white">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            <div className="flex items-center my-2">
              {Array.from({ length: Math.floor(product.rating || 0) }).map(
                (_, i) => (
                  <IoMdStar key={i} className="text-yellow-400" />
                )
              )}
              {product.rating % 1 > 0 && (
                <IoMdStarHalf className="text-yellow-400" />
              )}
            </div>

            <p className="text-xl text-pink-400">${product.price}</p>

            <button
              className="mt-4 bg-pink-600 px-4 py-2 rounded"
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </button>

            <button
              onClick={() => setMoreDetail(!moreDetail)}
              className="mt-4 flex items-center text-pink-400"
            >
              {moreDetail ? "Hide" : "Show"} Details <IoIosArrowDown />
            </button>

            {moreDetail && (
              <p className="mt-2 text-gray-300">{product.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
