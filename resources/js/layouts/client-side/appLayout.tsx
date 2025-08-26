import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  const [isVisible, setIsVisible] = useState(false);

  // Back to top button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main>
      {/* Header Section */}
      <header>
        {/* Top bar */}
        <div className="bg-primary text-white py-2">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-2 md:mb-0">
              <a href="#" className="text-white hover:text-accent"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-white hover:text-accent"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white hover:text-accent"><i className="fab fa-youtube"></i></a>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-6 text-sm">
              <div><i className="fas fa-phone-alt mr-1"></i> Phone: 056526307</div>
              <div><i className="fas fa-envelope mr-1"></i> E-mail: fcichitwan@gmail.com</div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <img src="https://placehold.co/100x100/2563eb/FFFFFF?text=F" alt="Fonet Logo" className="h-16 w-16 mr-4"/>
                <div>
                  <h1 className="text-2xl font-bold text-primary">FONET STATIONARY CENTER</h1>
                  <p className="text-sm text-gray-600 italic">Today Writes for Tomorrow</p>
                </div>
              </div>
              
              <div className="relative w-full md:w-1/3">
                <input type="text" placeholder="Search..." className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"/>
                <button className="absolute right-2 top-2 text-gray-400 hover:text-primary">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-secondary sticky top-0 z-10 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <Link href="#" className="py-3 px-6 text-white hover:bg-primary">Home</Link>
              <Link href="#about" className="py-3 px-6 text-white hover:bg-primary">About Us</Link>
              
              {/* Services Dropdown */}
              <div className="group relative">
                <button className="py-3 px-6 text-white hover:bg-primary w-full md:w-auto text-left md:text-center flex justify-between items-center">
                  Services <i className="fas fa-chevron-down ml-2 text-xs"></i>
                </button>
                <div className="absolute left-0 mt-1 w-72 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                  <Link href="#services" className="block px-4 py-3 text-gray-800 hover:bg-blue-50 border-b">Thesis Typing</Link>
                  <Link href="#services" className="block px-4 py-3 text-gray-800 hover:bg-blue-50 border-b">Best Photocopy</Link>
                  <Link href="#services" className="block px-4 py-3 text-gray-800 hover:bg-blue-50 border-b">Stationary</Link>
                  <Link href="#services" className="block px-4 py-3 text-gray-800 hover:bg-blue-50 border-b">General Typing</Link>
                  <Link href="#services" className="block px-4 py-3 text-gray-800 hover:bg-blue-50 border-b">Documentations</Link>
                  <Link href="#services" className="block px-4 py-3 text-gray-800 hover:bg-blue-50 border-b">Students Materials</Link>
                  <Link href="#services" className="block px-4 py-3 text-gray-800 hover:bg-blue-50 border-b">Courier Services</Link>
                  <Link href="#services" className="block px-4 py-3 text-gray-800 hover:bg-blue-50 border-b">Others</Link>
                  <Link href="#services" className="block px-4 py-3 text-gray-800 hover:bg-blue-50">Price List</Link>
                </div>
              </div>
              
              <Link href="#notice" className="py-3 px-6 text-white hover:bg-primary">Notice</Link>
              <Link href="#gallery" className="py-3 px-6 text-white hover:bg-primary">Gallery</Link>
              <Link href="#contact" className="py-3 px-6 text-white hover:bg-primary">Contact Us</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <article>{children}</article>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src="https://placehold.co/100x100/FFFFFF/2563eb?text=F" alt="Fonet Logo" className="h-16 w-16 mb-4"/>
              <h3 className="text-xl font-bold mb-4">FONET STATIONARY CENTER</h3>
              <p className="text-blue-100">Today Writes for Tomorrow</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-100 hover:text-white">Home</a></li>
                <li><a href="#about" className="text-blue-100 hover:text-white">About Us</a></li>
                <li><a href="#services" className="text-blue-100 hover:text-white">Services</a></li>
                <li><a href="#notice" className="text-blue-100 hover:text-white">Notice</a></li>
                <li><a href="#gallery" className="text-blue-100 hover:text-white">Gallery</a></li>
                <li><a href="#contact" className="text-blue-100 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <p className="text-blue-100 mb-2">Bharatpur-10, Chitwan, Nepal</p>
              <p className="text-blue-100 mb-2">Phone: 056526307</p>
              <p className="text-blue-100 mb-2">Mobile: 9845220077</p>
              <p className="text-blue-100 mb-2">Email: fcichitwan@gmail.com</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-blue-100 hover:text-white text-xl"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-blue-100 hover:text-white text-xl"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-blue-100 hover:text-white text-xl"><i className="fab fa-youtube"></i></a>
                <a href="#" className="text-blue-100 hover:text-white text-xl"><i className="fab fa-instagram"></i></a>
              </div>
              
              <h4 className="text-lg font-semibold mb-2">Tools</h4>
              <p className="text-blue-100">Date Convert/Unicode to Preeti</p>
              <p className="text-blue-100">Preeti to Unicode Convert</p>
            </div>
          </div>
          
          <div className="border-t border-blue-400 mt-8 pt-6 text-center text-blue-100">
            <p>&copy; 2023 Fonet Stationary Center. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        id="backToTop" 
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-md transition-all duration-300 ${
          isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </main>
  );
}