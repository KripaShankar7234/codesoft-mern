import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { LuPanelLeftClose } from "react-icons/lu";
import API from "../services/api";

const Navbar = ({ search }) => {
  const [show, setShow] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => setShow(!show);

  const handleSearch = (e) => {
    search(e.target.value);
  };

  // ✅ FETCH CART COUNT FROM DB
  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCartCount(0);
        return;
      }

      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const products = res.data?.products || [];
      setCartCount(products.length);
    } catch (error) {
      console.error("Navbar cart error:", error);
      setCartCount(0);
    }
  };

  // ✅ LOAD CART COUNT ON PAGE LOAD + CART UPDATE
  useEffect(() => {
    fetchCartCount();

    window.addEventListener("cartUpdated", fetchCartCount);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartCount);
    };
  }, []);

  return (
    <div className="w-full h-[64px] sticky top-0 z-50">
      <nav className="w-full bg-gradient-to-b from-blue-800 to-stone-900">
  <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">


          {/* LOGO */}
          <h1 className="text-2xl font-bold text-white">Ecommerce</h1>

          {/* MOBILE ICON */}
          <CiMenuFries
            onClick={toggleMenu}
            size={30}
            className="lg:hidden text-white cursor-pointer"
          />

          {/* DESKTOP MENU */}
          {show && (
            <ul className="hidden lg:flex gap-5 items-center text-white">

              <input
                type="text"
                onChange={handleSearch}
                placeholder="What do you want"
                className="px-2 py-1 rounded text-black"
              />

              <li>
                <Link to="/" className="hover:text-yellow-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/cart" className="hover:text-yellow-400">
                  Cart
                  <sup className="ml-1 text-green-400 font-bold">
                    {cartCount}
                  </sup>
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-yellow-400">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/Singin" className="hover:text-yellow-400">
                  Register
                </Link>
              </li>
            </ul>
          )}

          {/* MOBILE MENU */}
          {!show && (
            <ul className="absolute top-0 left-0 w-[180px] h-screen bg-black/80 text-white flex flex-col gap-6 p-4 z-50">

              <LuPanelLeftClose
                onClick={toggleMenu}
                className="text-xl cursor-pointer"
              />

              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search"
                className="px-2 py-1 rounded text-black"
              />

              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>

              <Link to="/cart" onClick={toggleMenu}>
                Cart <sup className="text-green-400">{cartCount}</sup>
              </Link>

              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>

              <Link to="/Singin" onClick={toggleMenu}>
                Signup
              </Link>
              
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
