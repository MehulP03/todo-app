import './App.css';
import Chat from './component/Chat_Room';
import MenuBar from './component/Navbar_Chat';

function App() {
  return (
    <div className="App">
      <h1>You're in App</h1>
      <MenuBar/>
      <h1>You're in App</h1>
      <Chat/>
    </div>
  );
}

export default App;
