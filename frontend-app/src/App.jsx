import Header from "./components/header";
import Footer from "./components/footer";
import Upload from "./components/upload";

function App() {
  return (<div className="min-h-screen flex flex-col bg-[#0b0f19]">


    
    <Header />

    {/* Main Content */}
    <main className="grow">
      <Upload />
    </main>

    
    <Footer />

  </div>


  );
}

export default App;
