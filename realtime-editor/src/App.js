import {BrowserRouter ,Routes,Route} from "react-router-dom"
import Home from "./Pages/Home";
import Editor from "./Pages/Editor";

function App() {
  return (
    <div className="app bg-white">
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Home/>} />
      <Route  path='/editor/:roomId' element={<Editor/>} />
    </Routes>
    {/* <Editor/> */}
    </BrowserRouter>
    
    </div>
  );
}

export default App;
