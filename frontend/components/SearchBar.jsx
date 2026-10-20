import { Search } from "lucide-react";

export default function SearchBar({ placeholder = "Search tickets", ...props }) {
  return <label className="search-bar"><Search aria-hidden="true" /><input type="search" placeholder={placeholder} {...props} /></label>;
}