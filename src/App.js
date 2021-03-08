import './App.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Details from './Components/BookDetails'
import Nav from './Components/Navbar'

function App() {
  return (
    <div>
      <Nav />
      <Details />
    </div>
    
  );
}

export default App;
