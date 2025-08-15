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

    const cod = {
        codificar: (text, mode) => {
            if (!text) {
                MySwal.fire({
                    text: 'No hay texto para codificar',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            };
            if (!!s.loadings?.cod?.codificar) return;
            u2('loadings', 'cod', 'codificar', true);
            const link = `codec/codificar/`;
            const data = {
                text, mode
            }
            miAxios.post(link, data)
            .then(res => {
                const { text } = res.data;
                u1('cod', 'textoCodificado', text);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                u2('loadings', 'cod', 'codificar', false);
            });
        },
        decodificar: (text, mode) => {
            if (!text) {
                MySwal.fire({
                    text: 'No hay texto para decodificar',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            };
            if (!!s.loadings?.cod?.decodificar) return;
            u2('loadings', 'cod', 'decodificar', true);
            const link = `codec/decodificar/?text=${text}&mode=${mode}`;
            miAxios.get(link)
            .then(res => {
                const { text } = res.data;
                u1('cod', 'textoDecodificado', text);
            }).catch(err => {
                console.log(err);
                const message = err.response?.data?.message || 'Error';
                MySwal.fire({
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }).finally(() => {
                u2('loadings', 'cod', 'decodificar', false);
            });
        }
    }

    const im2aci = {
        saveImage: img_b64 => {
            const link = `im2aci/save_image`;
            const data = {img_b64};
            miAxios.post(link, data)
            .then(res => {
                console.log(res.data);
                const { file_name } = res.data;
                u1('im2aci', 'image_url', file_name);
            }).catch(err => {
                const message = err.response?.data?.message || 'Error';
                MySwal.fire({
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
        },
        img2ascii: (imageUrl, localAncho, localRmbg) => {
            const link = `im2aci/img2ascii?file_name=${imageUrl}&ancho=${localAncho}&rmbg=${localRmbg}`;
            miAxios.get(link)
            .then(res => {
                const { arte_ascii } = res.data;
                u1('im2aci', 'arte_ascii', arte_ascii);
            }).catch(err => {
                const message = err.response?.data?.message || 'Error';
                MySwal.fire({
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
        }
    }

    const vitim = {
        sendVideo: (video, options) => {
            if (!video) {
                MySwal.fire({
                    text: 'No video to process',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            }
            if (!!s.loadings?.vitim?.loading) return;
            u2('loadings', 'vitim', 'loading', true);
            u1('vitim', 'status', 'UPLOADING');
            const link = `vitim/process_video/`;
            const data = {
                video,
                options
            }
            miAxios.post(link, data)
            .then(res => {
                const { key } = res.data;
                u1('vitim', 'taskKey', key);
                u1('vitim', 'status', 'PROCESSING');
            }).catch(err => {
                console.log(err);
                const message = err.response?.data?.message || 'Error';
                MySwal.fire({
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                u1('vitim', 'status', 'FAILED');
            }).finally(() => {
                u2('loadings', 'vitim', 'loading', false);
            });
        },
        checkStatus: (key) => {
            if (!key) return;
            const link = `vitim/check_status/?key=${key}`;
            miAxios.get(link)
            .then(res => {
                const { status, image_count } = res.data;
                u1('vitim', 'processStatus', status);
                u1('vitim', 'imageCount', image_count);

                if (status.estatus === 'Done' || status.estatus === 'Error') {
                    u1('vitim', 'status', 'COMPLETED');
                }
            }).catch(err => {
                console.log(err);
                // Stop polling on error
                u1('vitim', 'status', 'FAILED');
            });
        },
        getImagesPage: (key, page = 1, limit = 20) => {
            if (!key) return;
            u2('loadings', 'vitim', 'images', true);
            const link = `vitim/get_images_page/?key=${key}&page=${page}&limit=${limit}`;
            miAxios.get(link)
            .then(res => {
                const { images, total_images, current_page, has_next } = res.data;
                u1('vitim', 'images', images);
                u1('vitim', 'totalImages', total_images);
                u1('vitim', 'currentPage', current_page);
                u1('vitim', 'hasNextPage', has_next);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                u2('loadings', 'vitim', 'images', false);
            });
        },
        scheduleCleanup: (key) => {
            if (!key) return;
            const link = `vitim/schedule_cleanup/`;
            const data = { key };
            miAxios.post(link, data)
            .then(res => {
                MySwal.fire({
                    title: 'Limpieza programada',
                    text: 'Los archivos se eliminarán en 30 minutos.',
                    icon: 'info',
                    timer: 5000,
                    showConfirmButton: false,
                });
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
                if (!!codigos?.[0]) {
                    alert(codigos?.[0]);
                }
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
        general, cod, im2aci, vitim, app, 
     };
}

export { useF };