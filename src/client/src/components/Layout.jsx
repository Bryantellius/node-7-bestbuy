import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sales">Sales</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Render child components (individual pages) */}
      {children}

      <footer>
        <span>Powered By Bryant</span>
      </footer>
    </div>
  );
};

export default Layout;
