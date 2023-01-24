import React from 'react'
import { Button } from '@material-tailwind/react'
import { AuthContext } from "../../../context/AuthProvider";
import { useContext } from "react";

function Settings() {

  const { logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between p-2 gap-x-2">
      <Button fullWidth variant="text" onClick={logout} className="bg-gray-300">
        Logout
      </Button>
    </div>
  );
}

export default Settings