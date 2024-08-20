import React from 'react';
import { useHistory } from "react-router-dom";
import { AuthFactory } from '../../factory';
import Utils from '../../factory/Utils';
import Lang from '../../lang';

function Login() {

  let history = useHistory();
  const [pwdInput, setPwdInput] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginAdmin = () => {
    Utils.showSpinner();
    AuthFactory.adminLogin({"email": email, "password": password})
      .then((res) => {
        if (res.status === 200) {
          AuthFactory.saveLoginUserInfo(res.data);
          Utils.showToast('success', 1500, res.message, '');
          history.push('/');
        } else {
          Utils.showToast('warning', 1500, res.message, '');
        }
        Utils.hideSpinner();
      })
      .catch(err => {
        console.log('err: ', err);
        Utils.showToast('error', 1500, "Error Occurred.", '');
        Utils.hideSpinner();
      });
  }

  const pwdInputFocusTrigger = (event) => {
    if (event.keyCode === 13) {
      pwdInput.focus();
    }
  }

  const loginTrigger = (event) => {
    if (event.keyCode === 13) {
      loginAdmin();
    }
  }

  return (
    <div className="Login">
      <div className="form-login card">
        <div className="card-body py-5">
          <h2 className="text-center mb-3">Admin Login</h2>
          <div className="form-group">
              <label>Email</label>
              <input className="form-control" 
                type="email"
                placeholder="Email" 
                value={email}
                onKeyUp={(event) => pwdInputFocusTrigger(event)}
                onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="form-group">
              <label>Password</label>
              <input className="form-control" 
                ref={input => setPwdInput(input)}
                type="password"
                placeholder="Password" 
                value={password}
                onKeyUp={(event) => loginTrigger(event)}
                onChange={(event) => setPassword(event.target.value)} />
          </div>
          <button className="btn btn-primary w-100" onClick={() => loginAdmin()}>{Lang.login}</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
