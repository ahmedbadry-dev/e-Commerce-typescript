import { createRoot } from 'react-dom/client'
import AppRouter from '@routes/AppRouter';

// redux
import { store } from '@store/index'
import { Provider } from 'react-redux';

// style
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')!)
  .render(
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
