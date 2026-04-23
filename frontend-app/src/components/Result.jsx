const Result = ({
    preview,
    pdfUrl,
    handleDownload,
    handlePrint
}) => {
    return (
        <div className="bg-card p-6 rounded-2xl border border-borderSubtle shadow-lg">

            <h2 className="text-lg font-semibold mb-4">Result</h2>

            {!pdfUrl && (
                <p className="text-textMuted text-sm">
                    Your generated sheet will appear here.
                </p>
            )}

            {pdfUrl && (
                <>
                    <iframe
                        src={pdfUrl}
                        className="w-full h-100 rounded-lg border border-borderSubtle mb-4"
                        title="PDF Preview"
                    />

                    <div className="flex gap-4">
                        <button
                            onClick={handleDownload}
                            className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg"
                        >
                            Download
                        </button>

                        <button
                            onClick={handlePrint}
                            className="flex-1 bg-gray-800 hover:bg-gray-900 py-2 rounded-lg"
                        >
                            Print
                        </button>
                    </div>
                </>
            )}

        </div>
    );
};

export default Result;