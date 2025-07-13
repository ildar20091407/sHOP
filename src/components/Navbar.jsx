import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoLnguage from '../assets/images/computer-icons-language-icon-png-favpng-NQSGiSmKDpKJpGXw1p4tMdi6Z.jpg';

const Navbar = () => {


   
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Default to 'light'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const links = [
    { title: 'Home', url: '/' },
    { title: 'Products', url: '/products' }, // Исправил название
    { title: 'Cart', url: '/Cart' }, // Исправил название
  ];

  return (
    <div className="navbar-container">
      <nav className="nav">
        <div className="nav__box">
          <div className="nav__left">
            <ul className="nav__list">
              {links.map((links, i) => (
                <li key={i}>
                  <Link to={links.url} className="nav__link">
                    {links.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="header__nav-box">
             
          <ul className="header__nav-list">
            <li className="header__nav-li" style={{ position: 'relative' }}>
              <img
                src={logoLnguage}
                className="header__nav-button"
                alt="Language selection"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                style={{ cursor: 'pointer' }}
                />
              {langMenuOpen && (
                <ul className="header__nav-dropdown">
                  <li><button>En</button></li>
                  <li><button>Ru</button></li>
                  <li><button>Uz</button></li>
                </ul>
              )}
            </li>

            {/* Theme Toggle Button */}
            <li className="header__nav-li">
              <button onClick={toggleTheme}>
                {theme === 'light' ? 'Dark' : 'Light'} Theme
              </button>
            </li>

          </ul>
              </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
