import { createRoot } from 'react-dom/client'


// layouts
import { MainLayout } from '@layouts/index'


//style
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <MainLayout />
)
