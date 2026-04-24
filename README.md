# 📸 FlickMaker

FlickMaker is a full-stack web application that allows users to generate professional passport-size photo sheets instantly.

Users can upload an image, remove the background, apply a custom background color, resize it to passport standards, and generate an A4 printable sheet with multiple copies.

---

## 🚀 Features

* Background Removal (AI-based)
* Background Color Replacement (White, Blue, Red, Black)
* Passport Size Auto Resize
* Image Enhancement
* Multiple Copy Generation (2, 4, 8, 12, 16)
* A4 Layout Generation
* PDF Export
* Download & Print Support
* Clean UI with Live Preview

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* FastAPI
* Pillow
* rembg (AI background removal)

---

## 📁 Project Structure

```
FlickMaker/
│
├── backend-app/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   └── main.py
│   ├── uploads/
│   ├── outputs/
│   └── requirements.txt
│
├── frontend-app/
│   ├── src/
│   ├── public/
│   └── package.json
```

---

## ⚙️ Backend Setup

```bash
cd backend-app
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## 💻 Frontend Setup

```bash
cd frontend-app
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔗 API Endpoint

```
POST /process-photo
```

### Parameters:

* file (image)
* num_copies (2, 4, 8, 12, 16)
* background_color (white, blue, red, black)

---

## 📦 How It Works

1. Upload image
2. Background removed using AI
3. Background replaced with selected color
4. Image resized to passport dimensions
5. Multiple copies generated
6. Arranged in A4 layout
7. Exported as PDF

---

## 🧹 Auto Cleanup

* Keeps only latest 5 uploaded files
* Automatically deletes old files
* Prevents storage overflow

---

## 📸 Output

* A4 printable PDF
* Ready for printing or download

---

## 🚀 Deployment (Next Step)

* Backend → Render
* Frontend → Vercel

---

## 👨‍💻 Author

Kanishk Jaiswal

---

## ⭐ Future Improvements

* Image editor (crop, brightness, contrast)
* File converter (PDF, PNG, JPG)
* Drag & drop upload
* User dashboard
* Cloud storage integration
