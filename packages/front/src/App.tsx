import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        Hello Vite + React + Typescript + TailwindCSS!
      </div>
    </>
  );
}

export default App;
