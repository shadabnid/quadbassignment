import Home from "./components/Home";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Summary from "./components/Summary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/summary/:itemId' element={<Summary/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
