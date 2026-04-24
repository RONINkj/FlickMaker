const Footer = () => {
return ( <footer className="w-full border-t border-gray-800 bg-[#0b0f19] mt-10"> <div className="max-w-7xl mx-auto px-6 py-4 text-center">


    <p className="text-sm text-gray-500">
      © {new Date().getFullYear()} FlickMaker. Built with FastAPI & React.
    </p>

  </div>
</footer>


);
};

export default Footer;
