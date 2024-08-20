import React from 'react';
import './App.scss';
import './scss/styles.scss';
import Admin from './admin/Admin';
import { EventEmitter } from './events';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";
const override = css`
  display: block;
  top: 50%;
  left: 50%;
`;

function App() {

  const [loading, setLoading] = React.useState(false);

  EventEmitter.subscribe('isLoading', (event) => setLoading(event));
  
  return (
    <div className="App">
      <Admin />
      <NotificationContainer/>
      <div className={loading ? "overlay-loader" : "d-none"}>
        <FadeLoader
            css={override}
            size={150}
            color={"#d8b469"}
            loading={loading}
          />
      </div>
    </div>
  );
}

export default App;
