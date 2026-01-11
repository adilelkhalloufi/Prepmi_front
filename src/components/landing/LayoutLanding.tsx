import { Outlet } from "react-router-dom";
import { ScrollToTop } from "../ScrollToTop";
import { Header2 } from "../Header2";

export default function LayoutLanding() {


  return (
    <>
      <div className="w-full">

        <Header2 />
      </div>

      <Outlet />

      {/* <Footer /> */}
      <ScrollToTop />
    </>
  );
}