import { useContext, useEffect, useState } from "react";
import {
  Home,
  FileText,
  Users,
  MessageSquare,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";
import { ThemeDataContext } from "../context/ThemeContext";
import InstructorCourse from "../components/InstructorCourse";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import courseService from "../services/Course";
import { setInstructorCourses } from "../redux/reducers/CourseReducer";
import { Link } from "react-router-dom";
import InstructorAnalytics from "./InstructorAnalytics";


const InstructorDashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const { darkMode } = useContext(ThemeDataContext);
  let { currentUser, isLoggedin } = useSelector((state) => state.user);
  let dispatch = useDispatch();


  let { refetch } = useQuery({
    queryKey: ["getInstructorCourses"],
    queryFn: async function () {
      try {
        let instructorRes = await courseService.getInstructorCourses(
          currentUser?._id
        );

        if (
          Array.isArray(instructorRes.data) &&
          instructorRes.data.length !== 0
        ) {
          dispatch(setInstructorCourses(instructorRes.data));
          return instructorRes.data;
        }
        return [];
      } catch (error) {
        if (
          error?.response?.data?.message === "No Courses to display for you"
        ) {
          dispatch(setInstructorCourses([]));
        }
        return [];
      }
    },
    enabled: isLoggedin,
  });

  const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "Courses", icon: FileText },
    { name: "Students", icon: Users },
    { name: "Messages", icon: MessageSquare },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-64 p-5 shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-5">Instructor Panel</h2>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  activeItem === item.name
                    ? darkMode
                      ? "bg-blue-500 text-white"
                      : "bg-blue-500 text-white"
                    : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                <item.icon size={20} />
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-5 border-t pt-5">
          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            <Bell size={20} />
            Notifications
          </div>
          <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            <LogOut size={20} />
            Logout
          </div>
          <Link className="block text-blue-600 mt-3" to={"/"}>
            Go back to home
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-5">
        {activeItem === "Courses" && <InstructorCourse refetch={refetch} />}
        {activeItem === "Dashboard" && <InstructorAnalytics instructorId = {currentUser?._id}/>}
      </main>
    </div>
  );
};

export default InstructorDashboard;
