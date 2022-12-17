import { useNavigate} from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    return (
        <nav className="w-full bg-gray-100 px-24 py-5">
            <ul className="flex items-center">
                <li className="mr-auto text-2xl cursor-pointer font-bold" onClick={() => navigate("/")}>Planner</li>
            </ul>
        </nav>
    )
}

export default Navbar;