import { Outlet, useNavigation } from "react-router-dom";
import { ScrollToTop } from "../ScrollToTop";
import { Header } from "../Header";
import { Header2 } from "../Header2";
import Footer from "../Footer";

export default function LayoutLanding() {
  const navigation = useNavigation();

  // Check if the route is still loading
  const isLoading = navigation.state === "loading";

  return (
    <>
 
         <Outlet />
    
      {/* <Footer /> */}
      <ScrollToTop />
    </>
  );
}