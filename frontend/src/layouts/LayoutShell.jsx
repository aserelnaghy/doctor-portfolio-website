import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function LayoutShell() {
  return (
    <>
      <Header />
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
