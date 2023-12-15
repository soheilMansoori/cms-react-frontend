import SideBar from './Components/SideBar/SideBar';
import './css/main css/custom.css'
import './App.css'
import Header from './Components/Header/Header';
import { useRoutes } from 'react-router-dom';
import routes from './routes/routes'
function App() {
  const router = useRoutes(routes)
  return (
    <>
      <SideBar />
      <div className="main">
        <Header />
        {/* Router */}
        {router}
      </div>
    </>
  );
}

export default App;
