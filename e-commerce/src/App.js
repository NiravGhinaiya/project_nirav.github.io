import { Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './Components/ProductList';
import SignpForm from './Components/SignpForm'
import LoginForm from './Components/LoginForm'
// import ProductCart from './Components/ProductCart'
import FackeStoreapi from './apis/FackeStoreapi'
import Cart from './Components/Cart';
import PublicRout from './Components/PublicRout';

function App() {
  return (
    <div className="App">
      {/* <Cart /> */}
      <FackeStoreapi />
      <Routes>

        <Route path='/' element={<LoginForm />} />
        <Route path='/signup_form' element={<SignpForm />} />

        <Route element={<PublicRout />}>
          <Route path='/Home' element={<ProductList />} />
          <Route path='/productcart' element={<Cart />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
