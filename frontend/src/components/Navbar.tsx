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

    // Set initial mode based on local storage
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
    // Save the preference in local storage
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
        <h1 className="pl-20 text-xl">
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
        <div className="md:hidden pr-20">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MdOutlinePerson />
          </button>
        </div>
        <div className="hidden md:flex space-x-4 pr-20">
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
            className={`navRoutes hover:text-yellow-400 ml-4 p-2 rounded${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <MdOutlineDarkMode size={20} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 pr-20 pl-20">
          <a href="#" className="block hover:text-gray-400">
            Home
          </a>
          <a href="#" className="block hover:text-gray-400">
            About
          </a>
          <a href="#" className="block hover:text-gray-400">
            Blog
          </a>
          <a href="#" className="block hover:text-gray-400">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
