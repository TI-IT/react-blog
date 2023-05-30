import './App.css';
import {Routes, Route} from 'react-router-dom';
import Layout from "./Latout";
import IndexPage from "./pages/indexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {UserContextProvider} from "./context/UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<IndexPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/rsegister' element={<RegisterPage/>}/>
                    <Route path='/create' element={<CreatePost/>}/>
                    <Route path='/post/:id' element={<PostPage/>}/>
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
