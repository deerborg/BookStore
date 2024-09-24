# Library Management

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## Live Demo

A live demo of the application can be found at:

https://kaleidoscopic-valkyrie-ef4e97.netlify.app/

# Library Management System

This project is a **Library Management System** built with **Java Spring Boot** for the backend and **React** for the frontend. The project is containerized and deployed using **Docker** for ease of setup and deployment. The system allows users to manage books, categories, authors, and track borrowing records.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Live Demo](#live-demo)
- [License](#license)

---

## Features

- **Book Management**: Add, update, delete, and view books.
- **Author Management**: Manage author details.
- **Category Management**: Organize books by categories.
- **Borrowing System**: Track borrowers, borrow dates, and return status of books.
- **User-Friendly Interface**: Interactive and modern UI for both users and administrators.
- **Containerized Deployment**: Easily deployable using Docker.

---

## Technologies Used

- **Backend**:
  - Java Spring Boot
  - PostgreSQL
- **Frontend**:
  - React
  - HTML
  - CSS
- **Containerization**: Docker

---

## Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/) (for running the React frontend)
- [Java 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or later

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/deerborg/BookStore.git
   cd library-management-system
   ```

2. **Build the Backend:** Navigate to the backend directory and build the application:

   ```bash
   cd backend
   ./mvnw clean install
   ```

3. **Set Up Docker:**

```bash
 docker-compose up
```

4. **Start the Frontend:** Navigate to the frontend directory:

```bash
   cd frontend
   npm install
   npm start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
