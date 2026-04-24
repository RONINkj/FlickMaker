const Header = () => {


    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <header className="w-full border-b border-gray-800 bg-[#0b0f19] backdrop-blur">

            <div className="max-w-7xl px-4 py-4 flex items-center justify-between">

                {/* Left: Logo + Brand */}
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={handleRefresh}
                >
                    <img
                        src="/logo.png"
                        alt="FlickMaker Logo"
                        className="w-9 h-9 object-contain hover:scale-105 transition duration-200"
                    />

                    <div className="flex flex-col leading-tight">
                        <h1 className="text-lg font-semibold text-white tracking-wide">
                            FlickMaker
                        </h1>
                        <span className="text-xs text-gray-400 hidden sm:block">
                            Passport Photo Generator
                        </span>
                    </div>
                </div>

            </div>
        </header>
    );


};

export default Header;
