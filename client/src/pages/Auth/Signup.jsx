import { Link } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

// context
import { AuthContext } from '../../context/AuthProvider';
import { useContext } from 'react';

function Signup() {

  const { signup } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  function handleSubmit() {
    signup({ name, email, password });
  }

  return (
    <div className="w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="mb-4 text-center text-3xl font-bold">Signup</h2>
      <form>
        <Input
          type="text"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button color="color" fullWidth onClick={handleSubmit}>
          Signup
        </Button>
      </form>
      <br />
      <h6 className="text-center ml-auto flex justify-center">
        <span className=" text-gray-600 mr-2">Already registered?</span>
        <Link to="/login" className="text-md font-semibold text-[#2196F3]">
          Login
        </Link>
      </h6>
    </div>
  );
}

export default Signup;
