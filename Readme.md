# Library Management System

Documentation of the architecture, planning, and tech stack of the **Library Management System** project built using **MERN Stack**.

---


## 📂 Project Structure

### Backend (Node.js + Express.js)

```
/backend
  |-- /models
  |-- /routes
  |-- /controllers
  |-- server.js
  |-- config.js
```

### Frontend (React.js)

```
/frontend
  |-- /src
      |-- /components
      |-- /pages
      |-- /context (opsional, untuk state management)
      |-- App.js
      |-- index.js
```

---

## 🗂️ Data Models

### 1. Book
- **_id**: ObjectId  
- **title**: String (required)  
- **author**: String (required)  
- **category**: ObjectId (ref → Category)  
- **publishedDate**: Date  
- **availableCopies**: Number  
- **totalCopies**: Number  

### 2. Category
- **_id**: ObjectId  
- **name**: String (required, unique)  

### 3. Lending (Riwayat Peminjaman)
- **_id**: ObjectId  
- **book**: ObjectId (ref → Book)  
- **borrowerName**: String (required)  
- **borrowDate**: Date (default: now)  
- **returnDate**: Date (optional)  
- **status**: String (enum: `['borrowed', 'returned']`, default: `borrowed`)  

---

## 🌐 API RESTful

| Method | Endpoint             | Deskripsi                          |
|--------|----------------------|------------------------------------|
| GET    | `/api/books`         | Mendapatkan daftar buku            |
| POST   | `/api/books`         | Menambah buku baru                 |
| GET    | `/api/books/:id`     | Mendapatkan detail buku            |
| PUT    | `/api/books/:id`     | Mengupdate data buku               |
| DELETE | `/api/books/:id`     | Menghapus buku                     |
| GET    | `/api/categories`    | Mendapatkan daftar kategori        |
| POST   | `/api/categories`    | Menambah kategori baru             |
| PUT    | `/api/categories/:id`| Mengupdate kategori                |
| DELETE | `/api/categories/:id`| Menghapus kategori                 |
| GET    | `/api/lendings`      | Mendapatkan riwayat peminjaman     |
| POST   | `/api/lendings`      | Menambah riwayat peminjaman baru   |
| PUT    | `/api/lendings/:id`  | Mengupdate status peminjaman       |
| DELETE | `/api/lendings/:id`  | Menghapus riwayat peminjaman       |

---

