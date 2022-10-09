import "./index.css";
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import PostsList from "./pages/PostsList";
import CharteCommu from "./pages/CharteCommu";
import CVG from "./pages/CVG";
import DetailPost from "./pages/DetailPost";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import QuestionReponse from "./pages/QuestionReponse";

function App() {
  return (
    <main className="App font-Syne">
      {/* ajouter une condition si page home => ne pas afficher */}
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/connexion' element={<Connexion/>} />
        <Route exact path='/liste_des_actions' element={<PostsList/>} />
        {/* ajouter un id pour aller sur l'action spécifique */}
        <Route exact path='/detail_action/' element={<DetailPost/>} />
        <Route exact path='/charte_de_la_communaute' element={<CharteCommu/>} />
        <Route exact path='/question&response' element={<QuestionReponse/>} />
        <Route exact path='/CVG' element={<CVG/>} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
