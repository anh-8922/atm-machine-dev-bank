//import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './AllRoutes';
//import 'bootstrap/dist/css/bootstrap.min.css'
//import SearchContextFunction from './Context/SearchContext'

function App() {
  
  return (
    <BrowserRouter>
        {/*<SearchContextFunction>*/}
          <div>
            <AllRoutes/>
          </div>
        {/*</SearchContextFunction>*/}
    </BrowserRouter>
  );
}

export default App;