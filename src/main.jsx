
import './index.css'
import App from './App.jsx'
import ReactDom from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './components/admin/UserContext.jsx';

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
)
