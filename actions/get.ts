"use client"
import { useEffect, useState } from "react";
import axios from "axios";

interface ProductImage {
  id: number;
  image_url: string;
  product_id: number;
  images: string;
  
}
interface Image {
  id: number;
  image: string;
  img: string;
  image_url:string;
}


// interface Subcat {
//   id: number;
//   name: string;
//   images: Image[];
// }
interface Category {
  id: number;
  name: string;
  price:number;
  image:string;
  indirim:number;
  variants:Variants[];
  sezon:string;
  indirimli_fiyat:string;
  images: Image[];
}

interface Variants {
  id: number;
  name: string;
  color:string;
  size:string;
  price: number;
  indirimli_fiyat: number;
  image: string;
  indirim:number;
}
interface User  {
  id: 1,
  username: string,
  email:string,
}
interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  indirim:number;
  user:User;
  indirimli_fiyat: number;
  city:string;
  place:string;
  adstatus:string;
  floors:number;
  subcat: Category[];
  rooms:string;
  variants: Variants[]
  images: ProductImage[] ;
}

export const useAllProducts = () => {
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products/");
        setProducts(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Bilinmeyen bir hata oluştu.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
export const useDetailProducts = (productId: string) => {
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}`);
        setProducts([response.data]);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };fetchProducts();
    
  }, [productId]); 

  return { products, error, loading };
};

export const useHeadCategories = () => {
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/headcategories/");
        setProducts(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Bilinmeyen bir hata oluştu.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
export const useBlog = () => {
  const [blog, setBlog] = useState<Category[]  | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get( "http://127.0.0.1:8000/api/blog/");
        setBlog(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Bilinmeyen bir hata oluştu.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { blog, loading, error };
};
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories/");
        setCategories(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Bilinmeyen bir hata oluştu.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { categories, loading, error };
};



export const useCategoryDetail = (categoryId: string) => {
  const [category, setCategory] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/categories/${categoryId}/details_with_products/`
        );
        setCategory(response.data.products); 
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Bilinmeyen bir hata oluştu.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  return { category, loading, error };
};




export const useDirectories = () => {
  const [directories, setDirectories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/directories/");
        setDirectories(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Bilinmeyen bir hata oluştu.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { directories, loading, error };
};
export const useDiscountBar = () => {
  const [discount, setDiscount] = useState<Category[]  | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/discountBar/");
        setDiscount(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Bilinmeyen bir hata oluştu.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { discount, loading, error };
};


// export const useBrowsers = () => {
//   const [browsers, setBrowsers] = useState<Category[]  | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/browser/");
//         setBrowsers(response.data);
//       } catch (error) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError("Bilinmeyen bir hata oluştu.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return { browsers, loading, error };
// };

// export const useApps = () => {
//   const [apps, setApps] = useState<Category[]  | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/app/");
//         setApps(response.data);
//       } catch (error) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError("Bilinmeyen bir hata oluştu.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return { apps, loading, error };
// };