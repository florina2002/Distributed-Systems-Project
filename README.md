# Distributed Systems Assignments

This repository contains implementations of distributed system components as part of university coursework. The projects focus on **request-reply communication**, **asynchronous messaging**, **real-time notifications**, and **secure WebSocket-based communication**.

---

## Assignment 1: Energy Management System (Request-Reply Communication)

### Description
Developed a **microservice-based** energy management system that allows administrators to manage users and smart metering devices.

### Features
- **User Management Microservice**:
  - CRUD operations on user accounts.
  - Authentication & role-based access control.
- **Device Management Microservice**:
  - CRUD operations on smart energy devices.
  - Mapping users to devices.
- **Security**:
  - Login authentication (Admin/Client).
  - Restricted access to pages based on user roles.
- **Tech Stack**:
  - **Backend**: Java Spring Boot (REST APIs)
  - **Frontend**: Angular/ReactJS

---

## Assignment 2: Monitoring & Communication Microservice (Asynchronous Messaging)

### Description
Built a **message-driven microservice** to process and monitor energy consumption in real-time.

### Features
- **Smart Metering Device Simulator**:
  - Reads sensor data and publishes messages via RabbitMQ.
- **Message Processing & Storage**:
  - Computes hourly energy consumption and stores it in a database.
- **Real-Time Notifications**:
  - Sends alerts via WebSockets when energy consumption exceeds the limit.
- **Tech Stack**:
  - **Backend**: Java Spring Boot
  - **Messaging**: RabbitMQ, WebSockets

---

## Assignment 3: Chat & Authorization Microservice (WebSockets & Security)

### Description
Implemented a **real-time chat system** and **secure authentication** for an Energy Management System.

### Features
- **WebSocket-based Chat**:
  - Users can message administrators in real-time.
  - Admins can chat with multiple users simultaneously.
- **Notifications**:
  - Read receipts and "user is typing" indicators.
- **OAuth2 Authentication**:
  - Secure login with Spring Security and JWT tokens.
- **Tech Stack**:
  - **Backend**: Spring Boot
  - **Communication**: WebSockets
  - **Authentication**: OAuth2, JWT

---

## Setup & Execution

### Prerequisites
- Java 11+
- Spring Boot
- RabbitMQ (for Assignment 2)
- PostgreSQL/MySQL database
- Node.js (if using a frontend)

