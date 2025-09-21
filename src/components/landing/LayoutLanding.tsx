import { Outlet, useNavigation } from "react-router-dom";
import { ScrollToTop } from "../ScrollToTop";
import { Header } from "../Header";
import Footer from "../Footer";

export default function LayoutLanding() {
  const navigation = useNavigation();

  // Check if the route is still loading
  const isLoading = navigation.state === "loading";

  return (
    <>
      {!isLoading && <Header />}
      <div className="container mt-20">
        <Outlet />
      </div>
      {!isLoading && <Footer />}
      <ScrollToTop />
    </>
  );
}