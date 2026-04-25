export const processPhoto = async (formData) => {
    const response = await fetch("https://flickmaker.onrender.com/process-photo", {
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
