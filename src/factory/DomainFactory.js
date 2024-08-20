import env from '../env';
import { GET, POST } from './Utils';

const addDomain = (data) => {
    const path = `${env.BASE_API}/admin/addDomain`;
    return POST(path, data);
}

const getDomains = () => {
    const path = `${env.BASE_API}/admin/getDomains`;
    return GET(path);
}

const removeDomain = (data) => {
    const path = `${env.BASE_API}/admin/removeDomain`;
    return POST(path, data);
}

const DomainFactory = {
    addDomain,
    getDomains,
    removeDomain
}

export default DomainFactory;