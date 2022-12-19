import Sidebar from "./Sidebar/Sidebar";
import TopBar from "./Dashboard/TopBar";

function Home(){
    return (
        <div className="flex h-full">
          <Sidebar />
          <TopBar />
        </div>
    );
}

export default Home;