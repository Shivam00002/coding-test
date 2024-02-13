import './App.css';
import AdminForm from './components/AdminForm';

function App() {
  return (
    <>
      <div className="w-full h-fit px-2 py-2 p-2 bg-blue-500 text-white">
        <h1 className='font-bold text-center text-[20px] '>Admin</h1>
      </div>
      <AdminForm />
    </>

  );
}

export default App;
