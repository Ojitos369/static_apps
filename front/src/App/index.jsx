import { useContext, useEffect } from 'react';
import { MyContext } from './MyContext';
import { AllContext } from './MyContext';
import { cambiarThema } from './core/helper';
import { Theme } from '../Components/Theme';

import { Index } from '../Pages/Index';
import { Test } from '../Pages/Test';

import { ItemsList } from '../Pages/ItemsList';

import { Menu } from '../Components/Modals/Menu';

import { Header } from '../Components/Header';
import { Route, Routes, Navigate } from 'react-router-dom';


const BgTheme = () => {
    const { ls } = useContext(AllContext);
    return (
        <>
            <div className={`wipeInDown full-page-container bg-my-${ls.theme}`}></div>
            <Theme />
        </>
    )
}

function AppUI() {
    const { ls, s } = useContext(AllContext);

    useEffect(() => {
        cambiarThema(ls?.theme);
    }, [ls?.theme]);

    return (
        <div className={`text-[var(--my-minor)]`}>
            <Header />
            <BgTheme />
            {!!s.modals?.menu?.index && <Menu />}
            <Routes>
                {/* -----------   Index   ----------- */}
                <Route path="/" element={<Index />} />
                {/* -----------   /Index   ----------- */}

                {/* -----------   ItemsList   ----------- */}
                <Route path="items_list" element={<ItemsList />} />
                {/* -----------   /ItemsList   ----------- */}

                {/* -----------   Test   ----------- */}
                <Route path="test" element={<Test />} />
                {/* -----------   /Test   ----------- */}

                {/* -----------   404   ----------- */}
                <Route path="*/" element={<div className='text-danger h1 text-center mt-5'>404 Not Found</div>} />
                {/* -----------   /404   ----------- */}

            </Routes>
        </div>
    );
}

function App(props) {
    return (
        <MyContext>
            <AppUI />
        </MyContext>
    );
}

export default App;
