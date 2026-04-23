import { useState } from "react";
import { processPhoto } from "../services/api";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [numCopies, setNumCopies] = useState(4);
    const [bgColor, setBgColor] = useState("white");
    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    // Handle file selection + preview
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);


        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setPreview(imageUrl);
        }


    };

    // Handle API call
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

            // IMPORTANT: store URL instead of auto download
            setPdfUrl(url);

        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }


    };

    // Download PDF
    const handleDownload = () => {
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = "FlickMaker_output.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Print PDF
    const handlePrint = () => {
        const printWindow = window.open(pdfUrl);
        printWindow.onload = () => {
            printWindow.print();
        };
    };

    return (
        <div style={{ padding: "20px" }}> <h2>FlickMaker</h2>

            ```
            {/* File Upload */}
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {/* Image Preview */}
            {preview && (
                <div style={{ marginTop: "10px" }}>
                    <h4>Image Preview:</h4>
                    <img src={preview} alt="preview" width="200" />
                </div>
            )}

            <br />

            {/* Copies Selection */}
            <label>Number of Copies: </label>
            <select
                value={numCopies}
                onChange={(e) => setNumCopies(e.target.value)}
            >
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
            </select>

            <br /><br />

            {/* Background Color */}
            <label>Background Color: </label>
            <select
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
            >
                <option value="white">White</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="black">Black</option>
            </select>

            <br /><br />

            {/* Generate Button */}
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Processing..." : "Generate"}
            </button>

            <br /><br />

            {/* PDF Preview + Actions */}
            {pdfUrl && (
                <div>
                    <h3>Result Preview:</h3>

                    <iframe
                        src={pdfUrl}
                        width="400"
                        height="500"
                        title="PDF Preview"
                    />

                    <br /><br />

                    <button onClick={handleDownload}>Download</button>

                    <button onClick={handlePrint} style={{ marginLeft: "10px" }}>
                        Print
                    </button>
                </div>
            )}
        </div>


    );
};

export default Upload;
