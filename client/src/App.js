import { Home } from "./components/Home";
import { SocketProvider } from "./context/socket";

function App() {
  return (
    <SocketProvider>
      <Home />
    </SocketProvider>
  );
}

export default App;
