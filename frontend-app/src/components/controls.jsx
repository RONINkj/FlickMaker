
const Controls = ({
    preview,
    numCopies,
    setNumCopies,
    bgColor,
    setBgColor,
    handleFileChange,
    handleSubmit,
    loading
}) => {
    return (
        <div
            className={`                 relative p-6 rounded-2xl shadow-lg
                bg-card border border-borderSubtle
                ${loading ? "animate-glow" : ""}
            `}
        >

            <h2 className="text-lg font-semibold mb-4">Upload & Settings</h2>

            {/* Upload */}
            <div className="mb-5">
                <label className="text-sm text-textSecondary">Upload Image</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-2 w-full bg-dark border border-borderSubtle rounded-lg p-2"
                />
            </div>

            {/* Preview */}
            {preview && (
                <div className="mb-5">
                    <p className="text-sm text-textMuted mb-2">Preview</p>
                    <img
                        src={preview}
                        className="w-32 rounded-lg border border-borderSubtle"
                    />
                </div>
            )}

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4 mb-6">

                <div>
                    <label className="text-sm text-textSecondary">Copies</label>
                    <select
                        value={numCopies}
                        onChange={(e) => setNumCopies(Number(e.target.value))}
                        className="mt-2 w-full bg-dark border border-borderSubtle rounded-lg p-2"
                    >
                        <option value={2}>2</option>
                        <option value={4}>4</option>
                        <option value={8}>8</option>
                        <option value={12}>12</option>
                        <option value={16}>16</option>
                    </select>
                </div>

                <div>
                    <label className="text-sm text-textSecondary">Background</label>
                    <select
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="mt-2 w-full bg-dark border border-borderSubtle rounded-lg p-2"
                    >
                        <option value="white">White</option>
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                    </select>
                </div>

            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primaryHover py-3 rounded-lg font-semibold"
            >
                {loading ? "Processing..." : "Generate"}
            </button>

        </div>
    );


};

export default Controls;
