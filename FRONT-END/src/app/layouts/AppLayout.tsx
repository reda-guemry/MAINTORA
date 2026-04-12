import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen bg-background-light">
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-lg font-semibold">Maintora</h1>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;