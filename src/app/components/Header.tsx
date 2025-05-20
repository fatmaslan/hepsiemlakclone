"use client";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import DiscountBar from "./DiscountBar";



const headCategories = [
  { id: 2, name: "Satılık" },
  { id: 3, name: "Kiralık" },
  { id: 4, name: "Sezonluk Kiralık" },
  { id: 5, name: "Projeler" },
];
const Header = () => {
  const placeholders = useMemo(() => ["arsayı", "ofisi", "evi"], []);
  const [currentText, setCurrentText] = useState("");
  const [loopIndex, setLoopIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(2);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const currentPhrase = placeholders[loopIndex % placeholders.length];

    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setCurrentText(currentPhrase.slice(0, currentText.length + 1));
      }, 100);
    }

    if (!isDeleting && currentText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setLoopIndex((prev) => (prev + 1) % placeholders.length);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, loopIndex, placeholders]);




const fetchProductsByHeadCategory = async (id: number) => {
  const res = await fetch(`http://127.0.0.1:8000/api/products/by_head_category/?head_category_id=${id}`);
  const data = await res.json();
  console.log(data); 
};
const handleSearch = () => {
  fetchProductsByHeadCategory(activeTab);
};

  return (
    <div
      className="relative h-[400px] bg-cover bg-center bg-no-repeat w-full max-w-[1400px] mx-auto"
      style={{ backgroundImage: "url('/bg.webp')" }}
    >
      <div className="absolute inset-0 bg-red-500/30" />
      <div className="absolute inset-0 flex items-center justify-center z-10 flex flex-col">
        <h1 className="text-white text-center sm:text-4xl  text-md sm:px-4 px-2">
          Tam istediğin <span className="font-bold">{currentText}</span>,
          Hepsiemlak’ta kolayca ara,{" "}
          <span className="font-bold">rahatça bul.</span>
        </h1>
<div className="sm:mt-6 mt-1 sm:w-[800px] w-[300px] p-7 sm:bg-white/30 bg-none backdrop-opacity-10 backdrop-invert rounded-md "> 
       <div className="flex gap-6 border-b border-white/50 mb-4 hidden md:flex">
        {headCategories.map((category) => (
          <button
            key={category.id}
             onClick={() => setActiveTab(category.id)}
    className={`pb-2 font-semibold ${
      activeTab === category.id
        ? "border-b-2 border-white"
        : "text-white"
    }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2 items-center p-2 rounded-md">
        <select className="text-black rounded-md px-3 py-2 bg-white hidden md:flex ">
          <option value="konut">Konut</option>
          <option value="arsa">Arsa</option>
          <option value="işyeri">İşyeri</option>
        </select>
        <input
          type="text"
          placeholder="Konum, ilan no ya da firma adıyla arayın"
          className="flex-1 px-4 py-2 rounded-md text-black w-full bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch}  className="bg-red-600 hover:bg-red-700 text-white sm:px-4 px-1 flex items-center gap-2  hidden md:flex">
          <FaSearch />
          Ara
        </Button>
        <Button onClick={handleSearch} variant="outline" className="text-white border-white bg-transparent hidden md:flex">
          Haritada Ara
        </Button>
      </div>
      </div>
      <DiscountBar/>
        </div>
        
      </div>
    
  );
};

export default Header;
