import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useDispatch, useSelector } from "react-redux";
import { f as ff } from "./fs";

const MySwal = withReactContent(Swal);

const base_link = 'http://localhost:8369/api/'
axios.defaults.withCredentials = true
const miAxios = axios.create({
    baseURL: base_link,
});


const useF = props => {
    const ls = useSelector(state => state.fs.ls);
    const s = useSelector(state => state.fs.s);
    const d = useDispatch();

    const test = {
        test: () => {
            const end = "test/test/";
            miAxios.get(end).then(res => {
                console.log(res.data);
                const message = res.data.message || "Done Test";
                MySwal.fire({
                    title: message,
                    icon: 'success',
                });
            }).catch(err => {
                console.log(err);
                const message = err.response.data.message || "Error";
                MySwal.fire({
                    title: message,
                    icon: 'error',
                });
            });
        }
    }

    const llama = {
        chat: (message, cid) => {
            if (!message) return;
            if (!!s.loadings?.llama?.chat) return;
            u2('loadings', 'llama', 'chat', true);

            let link = `llama/chat/?`;
            if (!!cid) link += `cid=${cid}&`;
            link += `message=${message}`;

            // timeout 10 mins
            const timeout = 10 * 60 * 1000;

            miAxios.get(link, {timeout})
            .then(res => {
                const { msg, cid } = res.data;
                let hist = [...s.llama?.chat?.hist || []];
                hist.push({rol: "machine", msg});
                u2('llama', 'chat', 'hist', hist);
                u2('llama', 'chat', 'cid', cid);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                u3('loadings', 'llama', 'chat', false);
            });
        },
        deleteChat: cid => {
            if (!cid) return;
            if (!!s.loadings?.llama?.deleteChat) return;
            u2('loadings', 'llama', 'deleteChat', true);
            const link = `llama/del_chat/?cid=${cid}`;

            miAxios.get(link)
            .then(res => {
                u2('llama', 'chat', 'hist', []);
                u2('llama', 'chat', 'cid', '');
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                u3('loadings', 'llama', 'deleteChat', false);
            });
        }
    }

    // u[0-9]
    const u0 = (f0, value) => {
        d(ff.u0({f0, value}));
    }
    const u1 = (f0, f1, value) => {
        d(ff.u1({f0, f1, value}));
    }
    const u2 = (f0, f1, f2, value) => {
        d(ff.u2({f0, f1, f2, value}));
    }
    const u3 = (f0, f1, f2, f3, value) => {
        d(ff.u3({f0, f1, f2, f3, value}));
    }
    const u4 = (f0, f1, f2, f3, f4, value) => {
        d(ff.u4({f0, f1, f2, f3, f4, value}));
    }
    const u5 = (f0, f1, f2, f3, f4, f5, value) => {
        d(ff.u5({f0, f1, f2, f3, f4, f5, value}));
    }
    const u6 = (f0, f1, f2, f3, f4, f5, f6, value) => {
        d(ff.u6({f0, f1, f2, f3, f4, f5, f6, value}));
    }
    const u7 = (f0, f1, f2, f3, f4, f5, f6, f7, value) => {
        d(ff.u7({f0, f1, f2, f3, f4, f5, f6, f7, value}));
    }
    const u8 = (f0, f1, f2, f3, f4, f5, f6, f7, f8, value) => {
        d(ff.u8({f0, f1, f2, f3, f4, f5, f6, f7, f8, value}));
    }
    const u9 = (f0, f1, f2, f3, f4, f5, f6, f7, f8, f9, value) => {
        d(ff.u9({f0, f1, f2, f3, f4, f5, f6, f7, f8, f9, value}));
    }

    return { u0, u1, u2, u3, u4, u5, u6, u7, u8, u9,
        test, llama, 
     };
}

export { useF };