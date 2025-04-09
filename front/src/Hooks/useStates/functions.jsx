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

    const general = {
        cloneO: obj => {
            const clon = JSON.parse(JSON.stringify(obj));
            return clon
        },
        getUtcm6: () => {
            // utc -6 dd/mm/yyyy hh:mm:ss
            const utcDate = new Date();
            let date = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));
            date.setHours(date.getHours() - 6);
            date = `${date.toISOString().split('T')[0]} ${date.toTimeString().split(' ')[0]}`;

            return date;
        }
    }

    const llama = {
        chat: (message, cid) => {
            if (!message) return;
            if (!!s.loadings?.llama?.chat) return;
            u2('loadings', 'llama', 'chat', true);
            let hist = general.cloneO([...s.llama?.chat?.hist || []]);

            hist = [...hist, {role: "user", content: message, hora: general.getUtcm6()}];
            u2('llama', 'chat', 'hist', hist);

            let link = `llama/chat/?`;
            if (!!cid) link += `cid=${cid}&`;
            link += `msg=${message}`;

            // timeout 10 mins
            const timeout = 10 * 60 * 1000;

            miAxios.get(link, {timeout})
            .then(res => {
                const { msg, cid } = res.data;
                hist = [...hist, {role: "assistant", content: msg, hora: general.getUtcm6()}];
                u2('llama', 'chat', 'actualMessage', '');
                u2('llama', 'chat', 'hist', hist);
                u2('llama', 'chat', 'cid', cid);
                const element = document.getElementById('messageInput');
                if (!!element) element.focus();
            }).catch(err => {
                console.log(err);
                const message = err.response?.data?.message || 'Error';
                MySwal.fire({
                    title: 'Error',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }).finally(() => {
                u2('loadings', 'llama', 'chat', false);
            });
        },
        deleteChat: (cid, navigate) => {
            if (!cid) return;
            if (!!s.loadings?.llama?.deleteChat) return;
            u2('loadings', 'llama', 'deleteChat', true);
            const link = `llama/del_chat/?cid=${cid}`;

            miAxios.get(link)
            .then(res => {
                u2('llama', 'chat', 'hist', []);
                u2('llama', 'chat', 'cid', '');

                const message = res.data.message || `Chat ${cid} eliminado`;

                MySwal.fire({
                    title: 'Success',
                    text: message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });

                navigate('/llama');
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                u2('loadings', 'llama', 'deleteChat', false);
            });
        },
        loadChat: (cid, navigate) => {
            if (!cid) return;
            if (!!s.loadings?.llama?.loadChat) return;
            u2('loadings', 'llama', 'loadChat', true);
            const link = `llama/load_chat/?cid=${cid}`;

            miAxios.get(link)
            .then(res => {
                const { hist } = res.data;
                u2('llama', 'chat', 'hist', hist);
                u2('llama', 'chat', 'cid', cid);
                const element = document.getElementById('messageInput');
                if (!!element) element.focus();
            }).catch(err => {
                console.log(err);
                const message = err.response?.data?.message || 'Error';
                MySwal.fire({
                    title: 'Error',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                navigate('/llama');
            }).finally(() => {
                u2('loadings', 'llama', 'loadChat', false);
            });
        }
    }

    const cod = {
        codificar: text => {
            const link = `codec/codificar/?text=${text}`;
            miAxios.get(link)
            .then(res => {
                const { text } = res.data;
                u1('cod', 'textoCodificado', text);
            }).catch(err => {
                console.log(err);
            });
        },
        decodificar: text => {
            const link = `codec/decodificar/?text=${text}`;
            miAxios.get(link)
            .then(res => {
                const { text } = res.data;
                u1('cod', 'textoDecodificado', text);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    const app = {
        helloWorld: () => {
            const end = 'app/hello_world/';
            miAxios.get(end)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }, 
        enviarArchivo: file => {
            const end = 'test/test_image/';
            const data = {
                image_bs4: file
            }
            miAxios.post(end, data)
            .then(res => {
                console.log(res.data);
                const {codigos, mensaje} = res.data;
                u2("app", "test", "codigo", codigos?.[0] || '-');
                u2("app", "test", "mensaje", mensaje);
            })
            .catch(err => {
                console.log(err);
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
        general, llama, cod, app, 
     };
}

export { useF };