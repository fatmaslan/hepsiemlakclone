import Blog from "./components/Blog";
import Header from "./components/Header";
import ProductItem from "./components/ProductItem";
import Sub from "./components/Sub";

export default function Home() {
  return (
  
    <div className="flex flex-col  min-h-screen ">
     <Header/>
     <Sub/>
     <ProductItem/>
     <Blog/>
    </div>
  );
}
