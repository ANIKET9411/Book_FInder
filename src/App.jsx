import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detailspage from "./Pages/Detailspage";
import Header from "./component/Header";
import Storypage from "./Pages/Storypage";
import Incre from "./component/Incre";
import My_books from "./Pages/My_books";
import Side_navbar from "./component/Side_navabar";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="flex w-full h-[80vh] lg:mt-20 md:mt-16">
        <Side_navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/book/:id" element={<Detailspage />}></Route>
          <Route path="/story/:title" element={<Storypage />}></Route>
          <Route path="/My_books" element={<My_books />}></Route>
          <Route path="/search/:searchQuery" element={<Search />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    // <Incre />
  );
}

export default App;
