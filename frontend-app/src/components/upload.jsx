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
