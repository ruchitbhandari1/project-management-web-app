import Navbar from "./components/Navbar";
import AuthRoutes from "./components/AuthRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import { AuthContext } from "./context/AuthProvider";
import { useContext } from "react";

function App() {

  const {isAuthReady} = useContext(AuthContext);

  return (
    <div className="App">
      {isAuthReady && (
        <div className="flex flex-col h-screen">
          <Navbar />
          <AuthRoutes />
          <ToastContainer
            position="top-center"
            pauseOnFocusLoss={false}
            style={{
              zIndex: 99999,
            }}
           />
        </div>
      )}
    </div>
  );
}

export default App;
