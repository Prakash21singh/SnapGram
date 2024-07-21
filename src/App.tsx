import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import { Route, Routes } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostsDetails,
  Profile,
  Saved,
  UpdateProfile,
  Message,
  Chat,
} from "./_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import IndexPage from "./_root/pages/indexPage";
import { useMediaQuery } from "react-responsive";
const App = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <>
      <main className="flex h-screen">
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Route>
          {/* Private Route */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostsDetails />} />
            <Route path="/profile/:id*" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
            {!isMobile ? (
              <Route path="/chats" element={<Chat />}>
                <Route index element={<IndexPage />} />
                <Route path="/chats/:chatId/:userId" element={<Message />} />
              </Route>
            ) : (
              <Route path="/chats">
                <Route index element={<Chat />} />
                <Route path="/chats/:chatId/:userId" element={<Message />} />
              </Route>
            )}
          </Route>
        </Routes>
        <Toaster />
      </main>
    </>
  );
};

export default App;
