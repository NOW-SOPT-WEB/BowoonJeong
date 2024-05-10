import {Route, Routes} from 'react-router-dom';
import MainPage from './page/MainPage';
import LoginPage from './page/LoginPage';
import SignupPage from './page/SignupPage';
import MyPage from './page/MyPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:memberId" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/mypage/:memberId" element={<MyPage />} />
        </Routes>
    );
}

export default App;
