import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import News from './News';


function App() {
  return (
    <div className="App">
      <div className='yes'>
        <h3>Get Real Time News With </h3>
      <h1>GRT News</h1>
      {/* <input type='text' placeholder='search for you want to know' className='search'/> */}
      </div>
      <News />
 
  </div>
  );
}

export default App;
