
import { Link } from 'react-router-dom';


const Navbar = () => {

  const links = [
    { title: 'Products', url: '/' }, // Исправил название
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

              </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
