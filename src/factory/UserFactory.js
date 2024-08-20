// import Const from './Const';
import env from '../env';
import { POST, GET, DELETE } from './Utils';
// import { EventEmitter } from '../events';

const register = (newUser) => {
    const path = `${env.BASE_API}/admin/register`;
    return POST(path, newUser);
}

const addCustomer = (newUser) => {
    const path = `${env.BASE_API}/admin/customers/addCustomer`;
    return POST(path, newUser);
}

const getCustomers = () => {
    const path = `${env.BASE_API}/admin/customers`;
    return GET(path);
}

const getCustomerDetail = (id) => {
    const path = `${env.BASE_API}/admin/customers/${id}`;
    return GET(path);
}

const removeCustomer = (id) => {
    const path = `${env.BASE_API}/admin/customers/${id}`;
    return DELETE(path, null);
}

const UserFactory = {
    register,
    addCustomer,
    getCustomers,
    getCustomerDetail,
    removeCustomer
}

export default UserFactory;