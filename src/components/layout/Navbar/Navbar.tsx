import './Navbar.scss';
import SignUp from './SignUp';
import SearchBar from './SearchBar';
import Login from './Login';

export default function Navbar() {
  return (
    <header>
      <nav id="navbar">
        <div id="navbar-left">
          <h2>KINO <span>XII</span></h2>
          <p className="overline">SESSIONS</p>
        </div>

        <div id="navbar-actions">
          <SearchBar></SearchBar>
          <SignUp></SignUp>
          <Login></Login>
        </div>
      </nav>
    </header>
  );
}