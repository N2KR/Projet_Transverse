import "./app.css"
import Login from "./auth/login/Login"
import Register from "./auth/register/Register";
import Redirect from "./auth/redirect/Redirect";
import Topbar from "./user/components/topbar/Topbar";
import Sidebar from "./user/components/sidebar/Sidebar";
import Home from "./user/pages/home/Home";
import Information from "./user/pages/information/Information";
import Quiz from "./user/pages/quiz/Quiz"
import Contact from "./user/pages/contact/Contact";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    var logged = window.localStorage.getItem('logged')
    var role = window.localStorage.getItem('role')

    return (
        <BrowserRouter>
        {!logged ?
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            :
            <div>
                { role !== '1' &&
                    <div>
                        <Routes>
                            <Route path="/redirect" element={<Redirect />} />
                        </Routes>
                    </div>
                }
{/* User Role */}
                { role === '1' &&
                    <div className ="app">
                        <Sidebar />
                        <div className="app-container">
                            <Topbar />
                            <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path="/information" element={<Information/>} />
                                <Route path="/quiz" element={<Quiz />} />
                                <Route path="/contact" element={<Contact />} />
                            </Routes>
                        </div>
                    </div>
                }
            </div>
        }
        </BrowserRouter>
    );
}

export default App;