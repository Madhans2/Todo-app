import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import TaskDetail from "./components/TaskDetail";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import PrivateNotes from "./pages/PrivateNotes";
import Notes from "./pages/Notes";
import Reminders from "./pages/Reminders";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/task/:id" element={<TaskDetail />} />
           <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
           <Route path="/notes/private" element={<PrivateNotes />} />
           <Route path="/notes" element={<Notes />} />
            <Route path="/reminders" element={<Reminders />} />
        </Routes>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </div>
    </Router>
  );
}

export default App;
