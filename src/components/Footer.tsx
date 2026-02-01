import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            <p>
              &copy; {currentYear} Suraj. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Built with</span>
            <Heart className="text-red-500 fill-red-500" size={16} />
            <span>using React & Tailwind CSS</span>
          </div>

          <div className="text-gray-400 text-sm">
            <p className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">
              Designed for Innovation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
