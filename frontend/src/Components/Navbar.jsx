import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Quote from "./Button/GetQuote";
import logo from "../images/logocttpl.png";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

const services = [
  { to: "/employee-transport-service", label: "Employee Transport Services" },
  { to: "/car-leasing", label: "Car Leasing Services" },
  { to: "/dedicated-fleet-service", label: "Dedicated Fleet Services" },
  { to: "/school-fleet", label: "School Fleet Services" },
  { to: "/electric-fleet-service", label: "Electric Fleet Services" },
];

const aboutLinks = [
  { to: "/structure", label: "Our Structure" }, 
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const location = useLocation();

  const toggleMenu = () => setIsOpen((s) => !s);
  const toggleServices = () => setServicesOpen((s) => !s);

  // NavLink style
  const linkClasses = ({ isActive }) =>
    `hover:text-blue-950 transition duration-200 ${
      isActive ? "text-[#e42313] font-bold underline-offset-4" : ""
    }`;

  const isOnServiceRoute = () => {
    const path = location.pathname;
    if (path === "/services") return true;
    return services.some((s) => path === s.to || path.startsWith(s.to + "/"));
  };

  return (
    <nav className="bg-white text-black p-4 shadow-md sticky top-0 z-50">
      <div className="container md:mx-auto lg:mx-0 flex items-center justify-between">
        <NavLink to="/" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="CTT Logo" className="h-10 md:h-14" />
        </NavLink>

        {/* Desktop */}
        <div className="hidden lg:flex items-center space-x-6 text-sm mr-6 relative">

          <NavLink to="/" className={linkClasses}>
            HOME
          </NavLink>

          
          <div
            className="relative"
            onMouseLeave={() => setAboutOpen(false)}
          >
            <div className="flex items-center gap-2">

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${linkClasses({ isActive })} ${
                    location.pathname.startsWith("/structure")
                      ? "text-[#e42313] font-bold"
                      : ""
                  }`
                }
                onClick={() => setAboutOpen(false)}
              >
                ABOUT US
              </NavLink>

              <button
                onMouseEnter={() => setAboutOpen(true)}
                onClick={() => setAboutOpen((s) => !s)}
                className="p-1"
              >
                <FaChevronDown
                  className={`w-3 h-3 transition ${
                    aboutOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            
            <div
              className={`absolute left-0 mt-0 min-w-[200px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-150 ${
                aboutOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-1"
              }`}
            >
              <div className="py-3">
                <NavLink
                  to="/structure"
                  className="block px-5 py-3 text-sm text-[#1f3a5a] hover:bg-gray-50 hover:text-[#e42313]"
                  onClick={() => setAboutOpen(false)}
                >
                  Our Structure
                </NavLink>
              </div>
            </div>
          </div>

          
          <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
            <div className="flex items-center gap-2">
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `${linkClasses({ isActive })} ${
                    isOnServiceRoute() && !isActive
                      ? "text-[#e42313] font-bold"
                      : ""
                  }`
                }
                onClick={() => setServicesOpen(false)}
              >
                OUR SERVICES
              </NavLink>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleServices();
                }}
                onMouseEnter={() => setServicesOpen(true)}
                className="p-1"
              >
                <FaChevronDown
                  className={`w-3 h-3 transition ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div
              className={`absolute left-0 mt-0 min-w-[260px] rounded-md shadow-lg bg-white transition-all ${
                servicesOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-1"
              }`}
            >
              <div className="py-3">
                {services.map((s) => (
                  <NavLink
                    key={s.to}
                    to={s.to}
                    className="block px-5 py-3 text-sm text-[#1f3a5a] hover:bg-gray-50 hover:text-[#e42313]"
                    onClick={() => setServicesOpen(false)}
                  >
                    {s.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <NavLink to="/safety" className={linkClasses}>
            SAFETY & TECH
          </NavLink>

          <NavLink to="/careers" className={linkClasses}>
            CAREERS
          </NavLink>

          <NavLink to="/contact" className={linkClasses}>
            CONTACT US
          </NavLink>

          <Quote />
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/*  Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 mt-3" : "max-h-0"
        }`}
      >
        <div className="bg-white shadow-md rounded-md mx-4 p-4 flex flex-col gap-3 items-center">

          <NavLink to="/" onClick={() => setIsOpen(false)} className={linkClasses}>
            HOME
          </NavLink>

          {/* ABOUT US (Mobile Dropdown) */}
          <button
            onClick={() => setMobileAboutOpen((s) => !s)}
            className="flex items-center gap-2 font-medium"
          >
            ABOUT US
            <FaChevronDown
              className={`w-3 h-3 transition ${
                mobileAboutOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`${
              mobileAboutOpen ? "max-h-40 mt-2" : "max-h-0"
            } overflow-hidden transition-all duration-300 w-full`}
          >
            <NavLink
              to="/structure"
              onClick={() => {
                setIsOpen(false);
                setMobileAboutOpen(false);
              }}
              className="block text-center px-4 py-3 text-sm hover:bg-gray-50"
            >
              Our Structure
            </NavLink>
          </div>

          {/* SERVICES (mobile) */}
          <button
            onClick={() => setMobileServicesOpen((s) => !s)}
            className="flex items-center gap-2 font-medium"
          >
            OUR SERVICES
            <FaChevronDown
              className={`w-3 h-3 transition ${
                mobileServicesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`${
              mobileServicesOpen ? "max-h-96 mt-2" : "max-h-0"
            } overflow-hidden transition-all duration-300 w-full`}
          >
            {services.map((s) => (
              <NavLink
                key={s.to}
                to={s.to}
                onClick={() => {
                  setIsOpen(false);
                  setMobileServicesOpen(false);
                }}
                className="block text-center px-4 py-3 text-sm hover:bg-gray-50"
              >
                {s.label}
              </NavLink>
            ))}
          </div>

          <NavLink to="/safety" onClick={() => setIsOpen(false)} className={linkClasses}>
            SAFETY & TECH
          </NavLink>

          <NavLink to="/careers" onClick={() => setIsOpen(false)} className={linkClasses}>
            CAREERS
          </NavLink>

          <NavLink to="/contact" onClick={() => setIsOpen(false)} className={linkClasses}>
            CONTACT US
          </NavLink>

          <Quote />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
