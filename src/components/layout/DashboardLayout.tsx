import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 bg-gray-100 dark:bg-gray-900">
        <Header />

        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}
