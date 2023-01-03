import React from 'react'
import { Avatar, Button, Tooltip } from "@material-tailwind/react";
import { AuthContext } from '../../../../../context/AuthProvider'
import { useContext, useState, useCallback, useEffect } from 'react'
import AddMember from './AddMember';
import RemoveMember from './RemoveMember';

function Members({data, fetchProjectData}) {

  const {user} = useContext(AuthContext)
  const [members, setMembers] = useState([])
  function isAdmin(){
    if(!data.admin) return;
    return data.admin.some((curr) => curr._id === user._id);
  }

  useEffect(() => {
    setMembers(data.members)
  }, [data.members])

  return (
    <div className="ml-3 ">
      <h1 className="text-md font-extralight italic ">Members</h1>
      <div className="grid grid-cols-5 gap-y-2 mt-2">
        {members &&
          members.map((member) => {
            return (
              <Tooltip
                content={member.name}
              >
                <Avatar
                  key={member.name}
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1671459684~exp=1671460284~hmac=1b6e1e31cfe8fec4972c389de03755114490b6f37d581fb9e5e466688632ca6a"
                  alt="avatar"
                  variant="circular"
                  className="w-12 h-12"
                />
              </Tooltip>
            );
          })}
      </div>
      <div className='flex mt-3 justify-end'>
        {isAdmin() && <AddMember fetchProjectData={fetchProjectData} />}
        {isAdmin() && <RemoveMember data={members} fetchProjectData={fetchProjectData} />}
      </div>
    </div>
  );
}

export default Members