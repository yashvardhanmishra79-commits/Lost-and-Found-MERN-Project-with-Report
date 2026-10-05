import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Electronic from "./pages/Electronic"
import Others from "./pages/Others"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PostDetailsElectronic from "./pages/PostDetailsElectronic"
import CreatePost from "./pages/CreatePost"
import EditPost from "./pages/EditPost"
import Profile from "./pages/Profile"
import MyPosts from "./pages/MyPosts"
import { UserContextProvider } from "./context/UserContext"
import AdminDashboard from "./pages/admin/AdminDashboard"
import Users from "./pages/admin/Users"
import Posts from "./pages/admin/Posts"
import Comments from "./pages/admin/Comments"
import AdminRoute from "./components/AdminRoute"
import AdminLayout from "./pages/admin/AdminLayout"

const App = () => {
  return (
    <UserContextProvider>
      <Routes>

        {/* NORMAL ROUTES */}
        <Route path="/electronic" element={<Electronic />} />
        <Route path="/others" element={<Others />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/myposts/:id" element={<MyPosts />} />
        <Route path="/posts/post/:id" element={<PostDetailsElectronic />} />
        <Route path="/profile/:id" element={<Profile />} />

        {/* 🔐 ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
          <Route path="comments" element={<Comments />} />
        </Route>

      </Routes>
    </UserContextProvider>
  )
}

export default App