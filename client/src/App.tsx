import './App.scss';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Articles from './pages/Articles';
import LogIn from './pages/LogIn';
import CreateArticle from './pages/CreateArticle';
import MyArticles from './pages/MyArticles';
import EditArticle from './pages/EditArticle';
import Article from './pages/Article';
import Nav from './components/Nav';

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:articleId" element={<Article />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/create-article" element={<CreateArticle />} />
        <Route path="/edit-article" element={<EditArticle />} />
        <Route path="/my-articles" element={<MyArticles />} />
      </Routes>
    </>
  );
};

export default App;
