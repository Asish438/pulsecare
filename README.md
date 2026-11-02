
# 🏥 PulseCare – Hospital Management System

PulseCare is a Hospital Management System designed to streamline hospital operations and improve the management of patients, doctors, appointments, and healthcare services through a centralized digital platform.

## 🚀 Features

- Patient Registration and Login
- Patient Profile Management
- Doctor Management
- Appointment Booking and Scheduling
- Patient Medical Records Management
- Hospital Staff Management
- Admin Dashboard
- Role-Based Access Control
- Secure Authentication
- Centralized Patient Information Management

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- Bootstrap

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Spring Security
- REST APIs

### Database
- MySQL

### Development Tools
- IntelliJ IDEA / VS Code
- Postman
- Git & GitHub
- MySQL Workbench

## 🏗️ Project Architecture

The application follows a layered architecture:

- Controller Layer – Handles incoming HTTP requests.
- Service Layer – Implements business logic.
- Repository Layer – Handles database operations.
- Entity Layer – Defines database entities.
- Configuration Layer – Manages application configuration and security.

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Asish438/pulsecare.git
```

### 2. Navigate to the Project

```bash
cd pulsecare
```

### 3. Configure MySQL

Create a database:

```sql
CREATE DATABASE pulsecare;
```

Update your `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/pulsecare
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 4. Run the Application

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

## 🔮 Future Enhancements

- Online Payment Integration
- Prescription Management
- Pharmacy Management
- Laboratory Test Management
- Email and SMS Notifications
- Real-Time Appointment Updates
- Analytics and Reporting Dashboard

## 👨‍💻 Developer

**Asish Mahapatra**

- GitHub: https://github.com/Asish438

## 📄 License

This project is developed for educational and learning purposes.
