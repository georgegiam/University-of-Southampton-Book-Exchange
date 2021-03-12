import './App.css';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Landpage from './Components/LandingPage'
import Nav from './Components/Navbar'

function App() {
  return (
    <div>
      <Nav />
      <Landpage />
    </div>
    
  );
}

export default App;
