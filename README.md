# ✨ Magica — A Creative Blogging Platform 🪄

> **"Unleash your imagination and connect with fellow creators!"**

Magica is a **Next.js-based blogging platform** that offers users a magical space to **write, share, and interact** with others. From blog creation to a gamified subscription system and real-time chat — it's designed to engage, inspire, and empower bloggers.

🌐 **Live Site**: [Magica](https://my-blog-platform-fqtv.vercel.app)

---

## 🚀 Features

### 🌟 Frontend
- 🎨 **Responsive UI** built with **Tailwind CSS**
- 📝 **Rich blogging support** with image uploads (via Cloudinary)
- 🧩 **Subscriptions system** — unlock stages with live counts
- 👤 **User dashboard** for profile and blog management

### 🔐 Backend
- 🔐 **Firebase Authentication**
- 💬 **Real-time chat** with **Socket.io**
- 📦 **Firebase Firestore** for scalable backend
- ☁️ **Cloudinary integration** for media storage

---

## 🧪 Tech Stack

| Layer       | Technologies Used                                  |
|-------------|-----------------------------------------------------|
| **Frontend**| Next.js, React.js, Tailwind CSS, Magica UI          |
| **Backend** | Firebase, Socket.io, Cloudinary, Next.js API Routes|
| **Database**| Firebase Firestore                                  |

---

## 📚 Database Schema

### 👤 Users

| Field       | Type   |
|-------------|--------|
| `name`      | string |
| `email`     | string |
| `createdAt` | date   |

### 📝 Posts

| Field        | Type           |
|--------------|----------------|
| `title`      | string         |
| `slug`       | string         |
| `content`    | string         |
| `coverImage` | null / string  |
| `url`        | string         |
| `createdAt`  | date           |

### 💬 Messages

| Field       | Type   |
|-------------|--------|
| `roomID`    | string |
| `userID`    | string |
| `createdAt` | date   |
| `test`      | empty  |

---

## ⚙️ Setup Instructions

### 🔧 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Simer13/my-blog-platform.git
   cd my-blog-platform
2. **Install dependencies**
   ```bash
   npm install
3. **Start the development server**
   ```bash
   npm run dev

## 👨‍💻 Author

**Simer13**

Feel free to explore, contribute, and connect!  
📨 *Pull requests and stars are always welcome!*

## 🌈 Contribute

If you'd like to help improve **Magica**, fork the repo and make a pull request — or open an issue for discussion.  
All magical coders welcome! 🧙‍♂️✨

---

## ⭐️ Thank You!

Thank you for visiting **Magica**.  
Keep creating. Keep imagining. ✨
