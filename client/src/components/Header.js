import { Link } from "react-router-dom";
import "../scss/Header.scss";

function Header() {
  return (
    <header>
      <Link to={`/users`}>All Users</Link>
      <Link to={`/users/add`}>Add User</Link>
    </header>
  );
}
export default Header;
