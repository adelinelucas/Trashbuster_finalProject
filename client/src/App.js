import "./index.css";
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import PostsList from "./pages/PostsList";
import PostsListv2 from "./pages/PostsListv2";
import CharteCommu from "./pages/CharteCommu";
import CVG from "./pages/CVG";
import DetailPost from "./pages/DetailPost";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import QuestionReponse from "./pages/QuestionReponse";
import Profil from "./pages/Profil";
import Logout from "./pages/Logout";
import AlertModal from "./components/AlertModal";
import { useGlobalContext } from './app/context';
import DetailPostv2 from "./pages/DetailPostv2";

function App() {
  const { alertInfo} = useGlobalContext();

  return (
    <>
      {alertInfo.show && <AlertModal />}
      <main className="App font-Syne overflow-x-hidden">
        {/* ajouter une condition si page home => ne pas afficher */}
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/connexion' element={<Connexion/>} />
          <Route exact path='/register' element={<Connexion/>} />
          <Route exact path='/profil' element={<Profil/>} />
          <Route exact path='/logout' element={<Logout/>} />
          <Route exact path='/liste_des_actions' element={<PostsList/>} />
          <Route exact path='/liste_des_actions_v2' element={<PostsListv2/>} />
          {/* ajouter un id pour aller sur l'action spécifique */}
          <Route exact path='/detail_action/:id' element={<DetailPost />} />
          <Route exact path='/detail_actionv2/:id' element={<DetailPostv2 />} />
          <Route exact path='/charte_de_la_communaute' element={<CharteCommu/>} />
          <Route exact path='/question&response' element={<QuestionReponse/>} />
          <Route exact path='/CVG' element={<CVG/>} />
        </Routes>
        <Footer />
      </main>
    </>
    
  );
}

export default App;
