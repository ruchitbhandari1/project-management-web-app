import {Button} from "@material-tailwind/react"
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

function Home(){
    const { logout } = useContext(AuthContext);

    function handleSubmit() {
        logout();
    }

    return (
      <div>
        <h1>Home</h1>
        <Button color="blue" onClick={handleSubmit}>
          Logout
        </Button>
      </div>
    );
}

export default Home;