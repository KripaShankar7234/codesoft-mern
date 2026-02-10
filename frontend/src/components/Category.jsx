import React from "react";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

/* ---------- ARROWS ---------- */
function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-[6%] h-full bg-black/30 flex items-center justify-center cursor-pointer"
    >
      <MdKeyboardArrowLeft size={45} className="text-white" />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-[6%] h-full bg-black/30 flex items-center justify-center cursor-pointer"
    >
      <MdKeyboardArrowRight size={45} className="text-white" />
    </div>
  );
}

/* ---------- CATEGORY COMPONENT ---------- */
const Category = ({ onCategorySelect }) => {
  const slides = [
    {
      image: "https://storage.googleapis.com/shy-pub/389981/indan-grocery-1724788522112.jpeg",
      title: "Daily Groceries",
      subtitle: "Up to 30% OFF",
      category: "groceries",
    },
    {
      image: "https://udippi.com/images/Slides/Slides_1100X500/Grocery.webp",
      title: "Fresh Essentials",
      subtitle: "Best Quality Products",
      category: "groceries",
    },
    {
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      title: "Latest Smartphones",
      subtitle: "Starting at ₹9,999",
      category: "mobiles",
    },
    {
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      title: "Smart Watches",
      subtitle: "New Arrivals",
      category: "watches",
    },
    {
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      title: "Trendy Fashion",
      subtitle: "Min 40% OFF",
      category: "clothes",
    },
    {
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      title: "Electronics Store",
      subtitle: "Headphones, Laptops & More",
      category: "electronics",
    },
  ];

  const categories = [
    "all",
    "mobiles",
    "laptops",
    "watches",
    "shoes",
    "clothes",
    "groceries",
    "books",
  ];

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,

    // ✅ FEATURE 2: PAUSE ON HOVER
    pauseOnHover: true,

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      {/* ---------- SLIDER ---------- */}
      <div className="relative w-full mt-[72px]">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative h-[30vh] md:h-[45vh] lg:h-[60vh]"
            >
              {/* IMAGE */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-8 md:px-16 text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-4">
                  {slide.subtitle}
                </p>

                {/* CATEGORY CTA */}
                <button
                  onClick={() => onCategorySelect(slide.category)}
                  className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* ---------- CATEGORY BUTTONS ---------- */}
      <div className="flex flex-wrap justify-center gap-4 py-6 bg-gray-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategorySelect(cat)}
            className="px-6 py-2 rounded-full border bg-white font-semibold capitalize hover:bg-blue-600 hover:text-white transition"
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
};

export default Category;
