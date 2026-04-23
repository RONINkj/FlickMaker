export const processPhoto = async (formData) => {
    const response = await fetch("http://127.0.0.1:8000/process-photo", {
        method: "POST",
        body: formData,
        headers: {
            Accept: "application/octet-stream"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to process image");
    }

    const blob = await response.blob();
    return blob;
};
