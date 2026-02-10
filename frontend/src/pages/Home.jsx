import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Category from "../components/Category";
import API from "../services/api";

const Home = ({ searchItem }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8); // ✅ LOAD MORE

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data || []);
        setFilteredProducts(res.data || []);
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // CATEGORY FILTER
  const handleCategorySelect = (category) => {
    setVisibleCount(8); // reset pagination
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.category === category)
      );
    }
  };

  // SEARCH FILTER
  useEffect(() => {
    const filtered = products.filter(
      (p) =>
        p.title.toLowerCase().includes(searchItem.toLowerCase()) ||
        p.category.toLowerCase().includes(searchItem.toLowerCase())
    );
    setVisibleCount(8); // reset pagination
    setFilteredProducts(filtered);
  }, [searchItem, products]);

  // ADD TO CART
  const addToCart = async (productId) => {
    try {
      await API.post(
        "/cart/add",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Added to cart 🛒");
    } catch {
      toast.error("Please login first");
    }
  };

  if (loading) {
    return <h2 className="text-center mt-20 text-xl">Loading...</h2>;
  }

  if (!filteredProducts.length) {
    return (
      <h2 className="text-center mt-20 text-red-500 text-xl">
        No products found
      </h2>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* CATEGORY + SLIDER */}
      <Category onCategorySelect={handleCategorySelect} />

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts
          .slice(0, visibleCount)
          .map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={p.image}
                alt={p.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg truncate">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-500 capitalize">
                  {p.category}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-xl font-bold text-green-600">
                    ₹{p.price}
                  </span>

                  {p.discountPercentage > 0 && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                      {p.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => addToCart(p._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                  >
                    Add to Cart
                  </button>

                  <Link
                    to="/viwe"
                    state={p}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-center"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* LOAD MORE BUTTON */}
      {visibleCount < filteredProducts.length && (
        <div className="flex justify-center pb-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
