import { BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    // BrowserRouter로 감싸줘야 useNavigate()가 작도
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
}

export default App;