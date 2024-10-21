import React, { useEffect, useState } from "react";
import {
  MdOutlinePerson,
  MdOutlineHome,
  MdOutlineBook,
  MdOutlineComment,
  MdOutlineDarkMode,
  MdOutlineViewInAr,
} from "react-icons/md";
import "aos/dist/aos.css";
import AOS from "aos";
import Typewriter from "typewriter-effect";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    AOS.init();
    AOS.refresh();

    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  return (
    <nav
      className={`w-full p-4 ${
        darkMode ? "bg-transparent text-white" : "bg-transparent text-black"
      }`}
    >
      <div
        className="flex justify-between items-center"
        data-aos="fade-down"
        data-aos-duration="1400"
      >
        <h1 className="text-xl">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              cursor: "|",
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString('<span style="color: #569CD6;">console.</span>')
                .typeString('<span style="color: #D7BA7E;">log</span>')
                .typeString('<span style="color: #FFD700;">(</span>')
                .typeString('<span style="color: #CE9178;">"</span>')
                .typeString('<span style="color: #CE9178;">jsacob</span>')
                .typeString('<span style="color: #CE9178;">"</span>')
                .typeString('<span style="color: #FFD700;">)</span>')
                .pauseFor(1000)
                .deleteAll()
                .start();
            }}
          />
        </h1>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            <MdOutlinePerson size={28} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#"
            className="navRoutes hover:text-blue-400 flex items-center"
          >
            <MdOutlineHome size="19" className="mr-2" /> Portfolio
          </a>
          <a
            href="#"
            className="navRoutes hover:text-blue-400 flex items-center"
          >
            <MdOutlinePerson size="20" className="mr-2" />
            About
          </a>
          <a
            href="#"
            className="navRoutes hover:text-blue-400 flex items-center"
          >
            <MdOutlineBook size="17" className="mr-2" />
            Blog
          </a>
          <a
            href="#"
            className="navRoutes hover:text-blue-400 flex items-center"
          >
            <MdOutlineComment size="17" className="mr-2" />
            Contact
          </a>
          <a
            href="#"
            className="navRoutes hover:text-blue-400 flex items-center"
          >
            <MdOutlineViewInAr size="17" className="mr-2" />
            DSA Solves
          </a>
          <button
            onClick={toggleDarkMode}
            className={`navRoutes hover:text-yellow-400 flex items-center p-2 rounded ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <MdOutlineDarkMode size={20} className="mr-2" />
            <span>Dark Mode</span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="navbar-dropdown mt-4 space-y-4 bg-black text-white p-4 rounded-lg">
          <a href="#" className="hover:text-gray-400">
            <MdOutlineHome size="19" className="mr-2 inline" /> Home
          </a>
          <a href="#" className="hover:text-gray-400">
            <MdOutlinePerson size="20" className="mr-2 inline" /> About
          </a>
          <a href="#" className="hover:text-gray-400">
            <MdOutlineBook size="17" className="mr-2 inline" /> Blog
          </a>
          <a href="#" className="hover:text-gray-400">
            <MdOutlineComment size="17" className="mr-2 inline" /> Contact
          </a>
          <a href="#" className="hover:text-gray-400">
            <MdOutlineViewInAr size="17" className="mr-2 inline" /> DSA Solves
          </a>
          <button
            onClick={toggleDarkMode}
            className={`hover:text-yellow-400 flex items-center p-2 rounded ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <MdOutlineDarkMode size={20} className="mr-2" />
            <span>Dark Mode</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
