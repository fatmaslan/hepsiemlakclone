import Link from "next/link";
import { HomeIcon } from "lucide-react"; 
interface BreadcrumbItem {
  label: string;
  href?: string; // Son itemde href olmayabilir
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="text-sm text-gray-600 flex items-center space-x-1">
      <Link href="/" className="flex items-center space-x-1 hover:underline">
        <HomeIcon className="w-4 h-4" />
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center space-x-1">
          <span className="mx-1">{">"}</span>
          {item.href ? (
            <Link href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
