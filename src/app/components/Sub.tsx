import React from "react";
import { IoIosHome } from "react-icons/io";
import { FaRegBookmark, FaHeart, FaBullhorn } from "react-icons/fa";

const features = [
  {
    title: "Konut Değerlendirme",
    description: "Evinizin değerini hepsiemlak ile saniyeler içinde keşfedin!",
    icon: <IoIosHome className="text-4xl text-red-500" />,
    badge: "YENİ",
  },
  {
    title: "Ücretsiz İlan Ver",
    description: "Müşterisini bulana kadar ilanını ücretsiz yayınla. Yenileme ücreti yok!",
    icon: <FaBullhorn className="text-3xl text-red-500" />,
  },
  {
    title: "Kayıtlı Aramalarım",
    description: "Aramanıza uygun yeni ilanlar geldiğinde size hemen haber verelim!",
    icon: <FaRegBookmark className="text-3xl text-red-500" />,
  },
  {
    title: "Favorilerim",
    description: "Beğendiğin ilanları favorilerine ekle, kolayca ulaş ve paylaş!",
    icon: <FaHeart className="text-3xl text-red-500" />,
  },
];

const Sub = () => {
  return (
    <div className="w-full bg-gray-100 py-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-sm p-4 flex items-center gap-4 relative"
          >
            {item.badge && (
              <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                {item.badge}
              </span>
            )}
            <div className="border-1 border-gray-600 p-3 rounded-full">{item.icon}</div>
            <div className="text-left">
              <h3 className="text-md font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sub;
