import React, {useState} from "react";
import Main from "./Main/Main.jsx";
import Sidebar from "./Sidebar/sidebar.jsx";


const App = () => {
    const [darkness, setDarkness] = useState(false);
    return (
        <>
            <Sidebar darkness={darkness} setDarkness={setDarkness} />
            <Main darkness={darkness}/>
        </>
    )
}

export default App;

