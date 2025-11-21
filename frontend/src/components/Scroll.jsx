import { useEffect, useState } from "react";

export default function Scroll({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect (() => {
    const timeout = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={`bg-[url('/scroll_vertical.webp')] md:bg-[url('/scroll.webp')] bg-no-repeat bg-center aspect-4/6 bg-cover w-[90%] md:w-[60%] lg:w-[55%] xl:w-[45%] sm:aspect-5/4 flex items-center justify-center ${isOpen ? 'opacity-100' : 'opacity-0 scale-x-50'} transition-all duration-300`}>
      <div className="flex flex-col grow h-full items-center justify-center text-midnight">
        {children}
      </div>
    </div>
  );
}
