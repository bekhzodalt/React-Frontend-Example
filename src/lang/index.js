import en from './en';
import cn from './cn';

import Const from '../factory/Const';

const getLang = () => {
    if (!localStorage.getItem(Const.LANGUAGE)) {
        return en;
    } else {
        switch(localStorage.getItem(Const.LANGUAGE)) {
            case "en" : return en;
            case "cn" : return cn;
            default : return en;
        }
    }
}

export default getLang();