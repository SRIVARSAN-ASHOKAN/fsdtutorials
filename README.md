# 24CSC42 Full Stack Development — Tutorials 1 & 2
## Kongu Engineering College, Erode | Dept of CSE | 2025-26 Even Semester

---

## TUTORIAL 1 — Student Feedback Application (React only)

### Folder: `tutorial1/`

### How to Run
```bash
cd tutorial1
npm install
npm start
# Opens at http://localhost:3000
```

### Component Structure
```
tutorial1/
├── public/
│   └── index.html
├── src/
│   ├── App.js              ← manages feedbacks[] state, passes to children
│   ├── index.js
│   ├── index.css
│   └── components/
│       ├── FeedbackForm.js ← controlled form (name, email, contact, message)
│       └── FeedbackList.js ← renders all feedback entries as cards
└── package.json
```

### Key Concepts Demonstrated
- Controlled form with `useState` (all inputs tracked)
- State lifted to App.js (parent manages feedbacks array)
- Props: `onSubmit` callback passed down to FeedbackForm
- Props: `feedbacks` array passed down to FeedbackList
- Form fields cleared after submission using `setForm(EMPTY_FORM)`
- FeedbackList updates dynamically — newest entry appears on top

---

## TUTORIAL 2 — Students Attendance Portal (React + Node + Express + MongoDB)

### Folder: `tutorial2/`
```
tutorial2/
├── server/                 ← Node.js + Express + MongoDB backend
│   ├── index.js            ← main Express server
│   ├── .env                ← MONGO_URI and PORT config
│   ├── models/
│   │   └── Attendance.js   ← Mongoose schema
│   ├── routes/
│   │   └── attendance.js   ← GET, PUT, DELETE, seed routes
│   └── package.json
│
└── client/                 ← React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js          ← fetches data, handles PUT/DELETE calls
    │   ├── index.js
    │   ├── index.css
    │   └── components/
    │       ├── AttendanceTable.js ← renders records, dropdowns, delete buttons
    │       └── Toast.js           ← notification component
    └── package.json
```

### Prerequisites
- Node.js (v18+)
- MongoDB running locally OR MongoDB Atlas URI

### Step 1 — Start the Backend Server
```bash
cd tutorial2/server
npm install
# Edit .env if using MongoDB Atlas:
#   MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/attendance_db
npm run dev      # uses nodemon for auto-reload
# Server runs at http://localhost:5000
```

### Step 2 — Start the React Frontend
```bash
# Open a new terminal
cd tutorial2/client
npm install
npm start
# Opens at http://localhost:3000
```

### Step 3 — Load Sample Data
- Click **"Load Sample Data"** button in the UI
- OR call: `POST http://localhost:5000/api/attendance/seed`

### REST API Endpoints

| Method | Endpoint                   | Description                    |
|--------|----------------------------|--------------------------------|
| GET    | /api/attendance            | Fetch all attendance records   |
| PUT    | /api/attendance/:id        | Update status of a student     |
| DELETE | /api/attendance/:id        | Delete an attendance record    |
| POST   | /api/attendance/seed       | Seed sample student data       |

### Key Concepts Demonstrated
- **GET** — `axios.get()` in `useEffect` fetches all records on load
- **PUT** — `axios.put()` on dropdown change updates status instantly
- **DELETE** — `axios.delete()` on button click removes record instantly
- **No page refresh** — state updated with `setRecords()` after each API call
- **Mongoose** — schema with enum validation for status field
- **CORS** — configured in Express to allow requests from React (port 3000)
- **Proxy** — `"proxy": "http://localhost:5000"` in client package.json

---

*Submitted for 24CSC42 Full Stack Development — 2025-26 Even Semester*
