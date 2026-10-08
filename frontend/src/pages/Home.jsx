import SectionCatagorize from "../components/SectionCatagorize";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <SectionCatagorize />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
