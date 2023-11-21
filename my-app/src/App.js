
import Routers from './Router'
import { Provider } from 'react-redux';
import store from './redux/store';
import ButtonAppBar from './components/AppBar';

export default function App() {
    return (
          <Provider store={store}>
            <ButtonAppBar/>
            <Routers />
          </Provider>
      );
    }

// import Try from './pages/try'
// export default function App() {
//   return ( 
//     <Provider store={store}>
//       <Try/>
//      </Provider> 
//   );

//   }

