import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { AuthFactory } from '../../../factory';

function Header() {

  let history = useHistory();
  const [loginUser, setLoginUser] = React.useState(null);
  React.useEffect(() => {
    const _loginUser = AuthFactory.getLoginUserData();
    setLoginUser(_loginUser);
  }, []);

  const logoutAdmin = () => {
    AuthFactory.adminLogout();
    history.push('/login');
  }

  return (
    <header className="Header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="d-flex">
          <div className="form-group my-auto ml-3">
            <input className="form-control" />
          </div>
        </div>
        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle variant="link profile-nav" id="dropdown-profile">
              <div className="d-block font-weight-bold">{loginUser ? loginUser.name : ""}</div>
              <div className="d-block text-dark">{loginUser ? loginUser.email : ""}</div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => logoutAdmin()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
}

export default Header;
