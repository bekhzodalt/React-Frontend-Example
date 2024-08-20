import {NotificationManager} from 'react-notifications';
import { EventEmitter } from '../events';
import Const from './Const';
import axios from 'axios';

// const GET = async (path) => {
//   try {
//       const headers = {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin': '*',
//           'Authorization': 'Bearer ' + localStorage.getItem(Const.TOKEN),
//       }
//       const res = await fetch(path, {method: 'GET', headers: headers});
//       return res.json();
//   } catch (err) {
//       throw err;
//   }
// }

const GET = async (path) => {
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + localStorage.getItem(Const.TOKEN),
            }
        }
        const res = await axios.get(path, config);
        return res.data;
    } catch (err) {
        throw err;
    }
    
}

// const POST = async (path, body) => {
//     try {
//         const headers = {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Authorization': 'Bearer ' + localStorage.getItem(Const.TOKEN),
//         }
//         const _body = JSON.stringify(body);
//         const res = await fetch(path, {method: 'POST', headers: headers, body: _body});
//         return res.json();
//     } catch (err) {
//         throw err;
//     }
// }

const POST = async (path, data) => {
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + localStorage.getItem(Const.TOKEN),
            }
        }
        const res = await axios.post(path, data, config);
        return res.data;
    } catch (err) {
        throw err;
    }
    
}

const PUT = async (path, data) => {
    try {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + localStorage.getItem(Const.TOKEN),
            }
        }
        const res = await axios.put(path, data, config);
        return res.data;
    } catch (err) {
        throw err;
    }
  }

const DELETE = async (path, body) => {
  try {
      const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + localStorage.getItem(Const.TOKEN),
      }
      const _body = JSON.stringify(body);
      const res = await fetch(path, {method: 'DELETE', headers: headers, body: _body});
      return res.json();
  } catch (err) {
      throw err;
  }
}

const showToast = (type, time, message, title = '') => {
    switch (type) {
        case 'info':
          NotificationManager.info(message, title, time);
          break;
        case 'success':
          NotificationManager.success(message, title, time);
          break;
        case 'warning':
          NotificationManager.warning(message, title, time);
          break;
        case 'error':
          NotificationManager.error(message, title, time);
        //   NotificationManager.error(message, title, time, () => {
        //     alert('callback');
        //   });
          break;
        default: break;
    }
}

const showSpinner = () => {
    EventEmitter.dispatch('isLoading', true);
}

const hideSpinner = () => {
    EventEmitter.dispatch('isLoading', false);
}

export {
    GET,
    POST,
    PUT,
    DELETE,
    showToast,
    showSpinner,
    hideSpinner
};

const Utils = {
    GET,
    POST,
    PUT,
    DELETE,
    showToast,
    showSpinner,
    hideSpinner
}

export default Utils;