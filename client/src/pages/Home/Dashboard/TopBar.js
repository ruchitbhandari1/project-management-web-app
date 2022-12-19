import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Requests from "./Requests";
import Details from "./Details";
import Projects from "./Projects/Projects";
import { AuthContext } from "../../../context/AuthProvider";
import { useContext, useState } from "react";
import { getOrgData } from "../../../Fetch/Organizations";
import { useEffect } from "react";

function TopBar() {
  const { user, selectedOrgId } = useContext(AuthContext);
  const [orgData, setOrgData] = useState(null);
  const tabs = [
    {
      label: "Projects",
      value: "projects",
      component: <Projects />,
    },
    {
      label: "Requests",
      value: "requests",
      component: <Requests />,
    },
    {
      label: "Details",
      value: "details",
      component: <Details />,
    },
  ];

  useEffect(() => {
    async function fetchOrgData() {
      if (!selectedOrgId) {
        return;
      }
      const response = await getOrgData(selectedOrgId);
      setOrgData(response.data.org);
    }
    fetchOrgData();
  }, [selectedOrgId]);

  function showRequestIfAdmin(value) {
    if (value !== "requests") {
      return true;
    }
    return orgData.admin.includes(user._id);
  }

  return (
    <>
      {orgData && (
        <div className="mx-3 my-2 w-1/2">
          {
            <Tabs value="projects">
              <TabsHeader className="bg-gray-300">
                {tabs.map(
                  ({ label, value }) =>
                    showRequestIfAdmin(value) && (
                      <Tab key={value} value={value}>
                        {label}
                      </Tab>
                    )
                )}
              </TabsHeader>
              <TabsBody className="">
                {tabs.map(
                  ({ value, component }) =>
                    showRequestIfAdmin(value) && (
                      <TabPanel className="p-0 mt-3" key={value} value={value}>
                        {component}
                      </TabPanel>
                    )
                )}
              </TabsBody>
            </Tabs>
          }
        </div>
      )}
    </>
  );
}

export default TopBar;
