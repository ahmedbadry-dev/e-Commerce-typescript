import { createRoot } from 'react-dom/client'
import AppRouter from '@routes/AppRouter';

// redux
import { store, persistor } from '@store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

// axios
import './services/axios-global.js'

// style
import 'bootstrap/dist/css/bootstrap.min.css';




createRoot(document.getElementById('root')!)
  .render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  )
