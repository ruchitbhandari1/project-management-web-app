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
        <>
          <Navbar />
          <AuthRoutes />
          <ToastContainer
            position="top-center"
            pauseOnFocusLoss={false}
           />
        </>
      )}
    </div>
  );
}

export default App;
