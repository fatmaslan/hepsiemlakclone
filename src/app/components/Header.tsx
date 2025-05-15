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
  const [activeTab, setActiveTab] = useState("Satılık");
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



//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get(
//           `/api/headcategories?name=${activeTab}`
//         );
//         if (data && data.length > 0) {
//           const headCategoryId = data[0].id;
//           const res = await axios.get(
//             `http://127.0.0.1:8000/api/headcategories/${headCategoryId}/details_with_products/`
//           );
//           setData(res.data);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, [activeTab]);


  return (
    <div
      className="relative h-[400px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.webp')" }}
    >
      <div className="absolute inset-0 bg-red-500/30" />
      <div className="absolute inset-0 flex items-center justify-center z-10 flex flex-col">
        <h1 className="text-white text-center text-4xl  px-4">
          Tam istediğin <span className="font-bold">{currentText}</span>,
          Hepsiemlak’ta kolayca ara,{" "}
          <span className="font-bold">rahatça bul.</span>
        </h1>
<div className="mt-6 w-[800px] p-7 bg-white/30 backdrop-opacity-10 backdrop-invert rounded-md "> 
       <div className="flex gap-6 border-b border-white/50 mb-4">
        {headCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.name)}
            className={`pb-2 font-semibold ${
              activeTab === category.name
                ? "border-b-2 border-white"
                : "text-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2 items-center p-2 rounded-md">
        <select className="text-black rounded-md px-3 py-2 bg-white ">
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
        <Button className="bg-red-600 hover:bg-red-700 text-white px-4 flex items-center gap-2">
          <FaSearch />
          Ara
        </Button>
        <Button variant="outline" className="text-white border-white bg-transparent">
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
