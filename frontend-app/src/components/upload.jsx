// import { useState } from "react";
// import { processPhoto } from "../services/api";

// const Upload = () => {
//     const [file, setFile] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [numCopies, setNumCopies] = useState(4);
//     const [bgColor, setBgColor] = useState("white");
//     const [loading, setLoading] = useState(false);
//     const [pdfUrl, setPdfUrl] = useState(null);

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);

//         if (selectedFile) {
//             setPreview(URL.createObjectURL(selectedFile));
//         }
//     };

//     const handleSubmit = async () => {
//         if (!file) {
//             alert("Please select an image");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("num_copies", numCopies);
//         formData.append("background_color", bgColor);

//         try {
//             setLoading(true);
//             const blob = await processPhoto(formData);
//             const url = URL.createObjectURL(blob);
//             setPdfUrl(url);
//         } catch (error) {
//             console.error(error);
//             alert("Something went wrong!");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDownload = () => {
//         const a = document.createElement("a");
//         a.href = pdfUrl;
//         a.download = "FlickMaker_output.pdf";
//         a.click();
//     };

//     const handlePrint = () => {
//         const win = window.open(pdfUrl);
//         if (!win) return alert("Popup blocked");
//         win.onload = () => win.print();
//     };

//     return (
//         <div className="min-h-screen bg-dark text-textMain flex items-center justify-center p-6">

//             <div className="w-full max-w-xl bg-card rounded-2xl p-6 shadow-xl border border-borderSubtle">

//                 {/* Header */}
//                 <h1 className="text-2xl font-bold mb-6 tracking-wide">
//                     📸 FlickMaker
//                 </h1>

//                 {/* Upload */}
//                 <div className="mb-5">
//                     <label className="block text-sm text-textSecondary mb-2">
//                         Upload Image
//                     </label>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         className="w-full bg-dark border border-borderSubtle rounded-lg p-2 text-sm"
//                     />
//                 </div>

//                 {/* Preview */}
//                 {preview && (
//                     <div className="mb-5">
//                         <p className="text-sm text-textMuted mb-2">Preview</p>
//                         <img
//                             src={preview}
//                             alt="preview"
//                             className="w-32 rounded-lg border border-borderSubtle"
//                         />
//                     </div>
//                 )}

//                 {/* Controls */}
//                 <div className="grid grid-cols-2 gap-4 mb-6">

//                     <div>
//                         <label className="block text-sm text-textSecondary mb-2">
//                             Copies
//                         </label>
//                         <select
//                             value={numCopies}
//                             onChange={(e) => setNumCopies(Number(e.target.value))}
//                             className="w-full bg-dark border border-borderSubtle rounded-lg p-2 text-sm"
//                         >
//                             <option value={2}>2</option>
//                             <option value={4}>4</option>
//                             <option value={8}>8</option>
//                             <option value={12}>12</option>
//                             <option value={16}>16</option>
//                         </select>
//                     </div>

//                     <div>
//                         <label className="block text-sm text-textSecondary mb-2">
//                             Background
//                         </label>
//                         <select
//                             value={bgColor}
//                             onChange={(e) => setBgColor(e.target.value)}
//                             className="w-full bg-dark border border-borderSubtle rounded-lg p-2 text-sm"
//                         >
//                             <option value="white">White</option>
//                             <option value="blue">Blue</option>
//                             <option value="red">Red</option>
//                             <option value="black">Black</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Button */}
//                 <button
//                     onClick={handleSubmit}
//                     disabled={loading}
//                     className="w-full bg-primary hover:bg-primaryHover text-white font-semibold py-2 rounded-lg transition"
//                 >
//                     {loading ? "Processing..." : "Generate Passport Sheet"}
//                 </button>

//                 {/* Result */}
//                 {pdfUrl && (
//                     <div className="mt-8">

//                         <h3 className="text-lg font-semibold mb-3">
//                             Result Preview
//                         </h3>

//                         <iframe
//                             src={pdfUrl}
//                             className="w-full h-64 rounded-lg border border-borderSubtle"
//                             title="PDF Preview"
//                         />

//                         <div className="flex gap-3 mt-4">

//                             <button
//                                 onClick={handleDownload}
//                                 className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
//                             >
//                                 Download
//                             </button>

//                             <button
//                                 onClick={handlePrint}
//                                 className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg"
//                             >
//                                 Print
//                             </button>

//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Upload;

import { useState } from "react";
import { processPhoto } from "../services/api";
import Controls from "./Controls";
import Result from "./Result";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [numCopies, setNumCopies] = useState(4);
    const [bgColor, setBgColor] = useState("white");
    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Please select an image");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("num_copies", numCopies);
        formData.append("background_color", bgColor);

        try {
            setLoading(true);
            const blob = await processPhoto(formData);
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = "FlickMaker_output.pdf";
        a.click();
    };

    const handlePrint = () => {
        const win = window.open(pdfUrl);
        if (!win) return alert("Popup blocked");
        win.onload = () => win.print();
    };

    return (
        <div className="min-h-screen bg-dark text-textMain p-8">

            <h1 className="text-3xl font-bold mb-8">📸 FlickMaker</h1>

            <div className="grid md:grid-cols-2 gap-8">

                <Controls
                    preview={preview}
                    numCopies={numCopies}
                    setNumCopies={setNumCopies}
                    bgColor={bgColor}
                    setBgColor={setBgColor}
                    handleFileChange={handleFileChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />

                <Result
                    preview={preview}
                    pdfUrl={pdfUrl}
                    handleDownload={handleDownload}
                    handlePrint={handlePrint}
                />

            </div>
        </div>
    );
};

export default Upload;