import { useEffect } from 'react';

import { store } from './store';
import { Provider } from "react-redux";
import { useStates } from '../Hooks/useStates';

import { cambiarThema } from '../Core/helper';
import { Theme } from '../Components/Theme';

import { Index } from '../Pages/Index';
import { Test } from '../Pages/Test';
import { Im2aci } from '../Pages/Im2aci';

import { Cod } from '../Pages/Cod';

import { ItemsList } from '../Pages/ItemsList';
import { AutomatasCelular } from '../Pages/AutomatasCelular';

import { Llama } from '../Pages/Llama';
import { Index as LlamaIndex } from '../Pages/Llama/Index';
import { Chat as LlamaChat } from '../Pages/Llama/Chat';

import { Vitim } from '../Pages/Vitim';

import { Menu } from '../Components/Modals/Menu';

import { Header } from '../Components/Header';
import { Route, Routes, Navigate } from 'react-router-dom';


const BgTheme = () => {
    const { ls } = useStates();
    return (
        <>
            <div className={`wipeInDown full-page-container bg-my-general`}></div>
            <Theme />
        </>
    )
}

function AppUI() {
    const { ls, s, f } = useStates();

    useEffect(() => {
        cambiarThema(ls?.theme);
    }, [ls?.theme]);

    useEffect(() => {
        f.u2('settings', 'configuraciones', 'idioma', ls?.settings?.idioma || 'es');
    }, [ls?.settings]);

    return (
        <div className={`text-[var(--my-minor)]`}>
            <Header />
            <BgTheme />
            {!!s.modals?.menu?.index && <Menu />}
            <Routes>
                <Route path="" element={<Index />} />
                <Route path="items_list" element={<ItemsList />} />
                <Route path="ac" element={<AutomatasCelular />} />
                <Route path="test" element={<Test />} />
                <Route path="cod" element={<Cod />} />
                <Route path="im2aci" element={<Im2aci />} />
                <Route path="vitim" element={<Vitim />} />
                {/* <Route path="llama" element={<Llama />}>
                    <Route path="" element={<LlamaIndex />} />
                    <Route path="chat" element={<LlamaChat />} />
                </Route> */}
                {/* -----------   404   ----------- */}
                <Route path="*/" element={<div className='text-danger h1 text-center mt-5'>404 Not Found</div>} />
                {/* -----------   /404   ----------- */}

            </Routes>
        </div>
    );
}

function App(props) {
    return (
        <Provider store={store}>
            <AppUI />
        </Provider>
    );
}

export default App;
