import Const from './Const';
import env from '../env';
import { POST } from './Utils';
import { EventEmitter } from '../events';

const getAdminLoginStatus = () => {
    return localStorage.getItem(Const.IS_LOGGED_IN) ? localStorage.getItem(Const.IS_LOGGED_IN) : false;
}

const adminLogin = async (credential) => {
    const path = `${env.BASE_API}/admin/loginAdmin`;
    return POST(path, credential);
}

const saveLoginUserInfo = (user) => {
    if (!user) {
        return null;
    }
    localStorage.setItem(Const.IS_LOGGED_IN, true);
    localStorage.setItem(Const.TOKEN, user.api_token);
    localStorage.setItem(Const.DISPLAY_NAME, user.name);
    localStorage.setItem(Const.USER_DATA, JSON.stringify(user));
    // refresh Login status
    EventEmitter.dispatch('refreshLogin', true);
}

const getToken = () => {
    return localStorage.getItem(Const.TOKEN) ? localStorage.getItem(Const.TOKEN) : false;
}

const getDisplayName = () => {
    return localStorage.getItem(Const.DISPLAY_NAME) ? localStorage.getItem(Const.DISPLAY_NAME) : false;
}

const getLoginUserData = () => {
    return localStorage.getItem(Const.USER_DATA) ? JSON.parse(localStorage.getItem(Const.USER_DATA)) : false;
}

const adminLogout = () => {
    localStorage.clear();
    // refresh Login status
    EventEmitter.dispatch('refreshLogin', false);
}

const updatePassword = async (credential) => {
    const path = `${env.BASE_API}/admin/updatePassword`;
    return POST(path, credential);
}

const AuthFactory = {
    getAdminLoginStatus,
    adminLogin,
    saveLoginUserInfo,
    getToken,
    getDisplayName,
    getLoginUserData,
    adminLogout,
    updatePassword
}

export default AuthFactory;