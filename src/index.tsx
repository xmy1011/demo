import ReactDOM  from 'react-dom';
import App from "./App";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor} from '@/redux';
import "@/styles/reset.less";


//  在 webpack的base.js中设置后，new webpack.definePlugin({process.env.NODE_ENV})
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("BASE_ENV", process.env.BASE_ENV);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  , 
  document.getElementById('root')
)


