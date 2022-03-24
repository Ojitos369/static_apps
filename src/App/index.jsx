import React from 'react';
import { AppUI } from '../AppUI';
import { Provier } from '../Context';

function App() {
  return (
    <Provier>
      <AppUI />
    </Provier>
  );
}

export default App;
