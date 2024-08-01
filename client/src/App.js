import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Users from "./components/Users";
import Add from './components/Add';
import Edit from "./components/Edit";
import View from './components/View';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/users" index element={<Users/>}/>
          <Route path="/users/add" index element={<Add/>}/>
          <Route path="/users/view/:id" element={<View/>}/>
          <Route path="/users/edit/:id" element={<Edit/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
