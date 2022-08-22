import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { legacy_createStore, applyMiddleware } from 'redux';
import { globalStore } from '../src/Redux/Reducers/index';
import ReduxThunk from "redux-thunk";
import { ChakraProvider, ThemeProvider, theme } from '@chakra-ui/react';


// ReactDOM.render(
//   <Provider store={legacy_createStore(globalStore, applyMiddleware(ReduxThunk))}>
//     <BrowserRouter>
//       <ChakraProvider>
//         <App />
//       </ChakraProvider>
//     </BrowserRouter>,
//   </Provider>,
//   document.getElementById('root')
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={legacy_createStore(globalStore, applyMiddleware(ReduxThunk))}>
    <BrowserRouter>
      {/* <ThemeProvider theme={theme}> */}
      <ChakraProvider >
        <React.StrictMode>
          <App />
        </React.StrictMode>
        {/* </ThemeProvider> */}
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
