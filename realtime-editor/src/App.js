import {BrowserRouter ,Routes,Route} from "react-router-dom"
import Home from "./Pages/Home";
import Editor from "./Pages/Editor";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Home/>} />
      <Route  path='/editor/:roomId' element={<Editor/>} />
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
