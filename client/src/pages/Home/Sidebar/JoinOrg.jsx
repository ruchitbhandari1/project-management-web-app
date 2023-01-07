import React, {useState} from 'react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from '@material-tailwind/react'
import { getOrgs, joinOrg } from '../../../Fetch/Organizations';
import { AuthContext } from '../../../context/AuthProvider';
import { useContext } from 'react';
import { useCallback } from 'react';
import { socket } from '../../../constants/constants';

function JoinOrg() {

  const { user, setSelectedOrgId } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [orgs, setOrgs] = useState([]);

  const fetchOrgs = useCallback(async function ()  {
    const response = await getOrgs(search);
    setOrgs(response.data.orgs);
  }, [search])
  
  function handleSearch(e) {
    e.preventDefault();
    fetchOrgs();
  }

  function handleJoin(orgId){
    async function fetchJoinOrg(){
      await joinOrg(orgId);
      fetchOrgs();
      socket.emit('joinOrg', {orgId, userId: user._id});
      setSelectedOrgId(orgId);
    }
    fetchJoinOrg();
  }

  function handleClose() {
    setOpen(false);
    setSearch('');
    setOrgs([]);
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(!open);
          fetchOrgs();
        }}
        variant="gradient"
        color="green"
        fullWidth
      >
        Join
      </Button>
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>
          <h4>Join an organization</h4>
        </DialogHeader>
        <DialogBody className="flex flex-col">
          <form className="w-full flex gap-x-4" onSubmit={handleSearch}>
            <Input
              type="text"
              label="Organization name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <Button color="blue" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </form>
          <div className="mt-2">
            {orgs &&
              orgs
                .filter((org) => !org.members.includes(user._id))
                .map((org) => (
                  <div
                    key={org._id}
                    className="flex bg-yellow-50 hover:bg-yellow-200 px-3 py-1 my-1 rounded-lg justify-between items-center"
                  >
                    <p className="text-black font-bold">{org.name}</p>
                    <Button
                      disabled={
                        org.requests.filter((request) => request.userId === user._id)
                          .length > 0
                      }
                      color="green"
                      size="sm"
                      ripple={false}
                      onClick={() => handleJoin(org._id)}
                    >
                      {org.requests.filter((request) => request.userId === user._id)
                        .length > 0
                        ? "Pending"
                        : "Join"}
                    </Button>
                  </div>
                ))}
          </div>
        </DialogBody>
        <DialogFooter className="justify-center">
          <Button onClick={handleClose} color="red" variant="text">
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default JoinOrg