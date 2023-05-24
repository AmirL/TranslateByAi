import { InputForm } from './components/InputForm';
import { TranslatedList } from './components/TranslatedList';

function App() {
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
