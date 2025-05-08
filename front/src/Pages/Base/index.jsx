import { useEffect, useRef, useState } from 'react';
import { useStates } from '../../Hooks/useStates';

const Base = props => {
    const { ls, lf, s, f } = useStates();

    return (
        <div>
            Base Component
        </div>
    );
};

export { Base };
