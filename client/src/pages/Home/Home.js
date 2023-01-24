import Sidebar from "./Sidebar/Sidebar";
import TopBar from "./Dashboard/TopBar";

function Home(){
    return (
        <div className="flex h-full bg-white">
          <Sidebar />
          <TopBar />
        </div>
    );
}

export default Home;