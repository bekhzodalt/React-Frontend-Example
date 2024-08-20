import env from '../env';
import { POST } from './Utils';

const addClub = (data) => {
    const path = `${env.BASE_API}/admin/addClub`;
    return POST(path, data);
}

const getCourses = (data) => {
    const path = `${env.BASE_API}/admin/getCourses`;
    return POST(path, data);
}

const removeClub = (data) => {
    const path = `${env.BASE_API}/admin/removeClub`;
    return POST(path, data);
}

const resetTable = (data) => {
    const path = `${env.BASE_API}/admin/resetTable`;
    return POST(path, data);
}

const syncClubTables = (data) => {
    const path = `${env.BASE_API}/admin/syncClubTables`;
    return POST(path, data);
}

const syncPinCoordinatesProdTablesOfClub = (data) => {
    const path = `${env.BASE_API}/admin/syncPCPTablesOfClub`;
    return POST(path, data);
}

const VccFactory = {
    addClub,
    getCourses,
    removeClub,
    resetTable,
    syncClubTables,
    syncPinCoordinatesProdTablesOfClub
}

export default VccFactory;