import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaPinterest } from 'react-icons/fa';
import { FaCcVisa, FaAmazonPay, FaGooglePay } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
<div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact Info Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">KSY</h2>
            <div className="flex items-start">
              <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0" />
              <p>Address: UP Siddharth Nagar India</p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 flex-shrink-0" />
              <a href="mailto:yashmaurya3377@gmail.com" className="hover:underline">kripayadav2021@gmail.com</a>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2 flex-shrink-0" />
              <a href="tel:+918787256663" className="hover:underline">+91 7234081047</a>
            </div>
            <Link 
              to="#" 
              className="inline-block border border-white text-white px-4 py-2 rounded mt-2 hover:bg-white hover:text-black transition-colors duration-300"
            >
              Get Direction →
            </Link>
            <div className="flex space-x-4 pt-2">
              {[FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaPinterest].map((Icon, index) => (
                <Link key={index} to="#" className="hover:text-gray-300 transition-colors">
                  <Icon className="text-xl" />
                </Link>
              ))}
            </div>
          </div>

          {/* Help Links Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Help</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Returns + Exchanges', 'Shipping', 'Terms & Conditions', 'FAQs', 'Compare', 'My Wishlist'].map((item) => (
                <li key={item}>
                  <Link to="#" className="hover:underline block py-1">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About Us</h3>
            <ul className="space-y-2">
              {['Our Story', 'Visit Our Store', 'Contact Us', 'About Us', 'Account'].map((item) => (
                <li key={item}>
                  <Link to="#" className="hover:underline block py-1">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Sign Up for Email</h3>
            <p>Sign up to get first dibs on new arrivals, sales, exclusive content, events, and more!</p>
            <form className="space-y-3">
              <div className="flex flex-col sm:flex-row  ">
                <input 
                  type="email" 
                  className="flex-grow px-2 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter email..." 
                  required
                />
                <button 
                  type="submit" 
                  className="bg-transparent border border-white text-white text-sm px-2 py-2 rounded hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap"
                >
                  Subscribe →
                </button>
              </div>
            </form>
            <div className="flex space-x-4 pt-2">
              <FaCcVisa className="text-2xl hover:text-gray-300 transition-colors" />
              <FaAmazonPay className="text-2xl hover:text-gray-300 transition-colors" />
              <FaGooglePay className="text-2xl hover:text-gray-300 transition-colors" />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 py-4 text-center">
          <p className="text-sm">© 2025 Kripa Shankar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
