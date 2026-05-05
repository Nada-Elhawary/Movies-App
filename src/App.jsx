import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Content from './Components/Content/Content';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Layout from './Components/Layout/Layout';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import Favorite from './Pages/Favorite/Favorite';
import Contact from './Pages/Contact/Contact';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/details/:id" element={<MovieDetails />} />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  )
}

export default App
