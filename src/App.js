import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home"; 
import Login from "./Login"; 
import F_bA from "./f_b"; 
import SignUp from "./SignUp"; 
import AnimeDetails from "./AnimeDetails";
import News from "./news";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Home" element={<Home/>}/>
        <Route path="/anime" element={<F_bA />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/news" element={<News/>}/>
      </Routes>
    </Router>
  );
}
export default App;