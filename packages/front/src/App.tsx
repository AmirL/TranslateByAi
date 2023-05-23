import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { InputForm } from './components/InputForm';
import { TranslatedList } from './components/TranslatedList';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-row  justify-center text-center">
        <InputForm />
        <TranslatedList />
      </div>
    </>
  );
}

export default App;
