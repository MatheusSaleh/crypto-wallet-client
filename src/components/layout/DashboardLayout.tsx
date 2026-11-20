import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TickerTape from "./TickerTape";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 bg-gray-100 dark:bg-gray-900">
        <TickerTape />
        <Header />

        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}
