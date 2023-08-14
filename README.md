Mess Management System at NIT Calicut

Welcome to the Mess Management project at NIT Calicut! This project is designed to streamline the management of mess operations at the campus. It is divided into two main sections: the Admin side and the Student side. The Admin side is accessible through a web application built using the MERN (MongoDB, Express.js, React, Node.js) stack, while the Student side is available as a mobile app built using Flutter for the frontend and Node.js for the backend.

Features

Admin Side
The Admin side of the Mess Management System empowers mess administrators to efficiently manage various aspects of the mess. Here are some of the key features:
  •	User Management: Admins can view the list of students enrolled in their mess and add new students to the system.
  •	Mess Cut Applications: Admins can review and process mess cut requests from students.
  •	Snack Inventory: Admins have the ability to manage the list of available snack items in the inventory.
  •	Snack Purchases: Admins can keep track of students who purchase snacks and manage the transaction records.
Student Side
The Student side of the Mess Management System provides convenient access for students to manage their mess-related activities. Key features include:
  •	Mess Cut Request: Students can request a mess cut through the app.
  •	Purchase History: Students can view their last 10 snack purchases from the inventory.
  •	Account Details: Students have access to their mess account details, including monthly fee statements and wallet balance.
  •	Wallet Integration (Planned): The project was initially planned to implement blockchain technology to convert the wallet balance into a crypto token. This token could have been used at campus stores. However, this feature was not completed due to time limitations.

Technologies Used

Admin Side
  •	Frontend: React
  •	Backend: Node.js
  •	Database: MongoDB
Student Side
  •	App Development: Flutter
  •	Backend: Node.js (common for both Admin and Student)
  •	Database: MongoDB



Installation
To set up and run the Mess Management System on your local environment, follow these steps:
1.          Clone the repository:
        git clone Shibin-Ez/messManagement (github.com)
        cd messManagement

  2.	Install dependencies:
    •	For Admin side (web application):
      cd admin
      npm install 

•	For the Student side (Flutter app):
  cd studentApp
  flutter pub add

3.	Set up the backend:
  •	For the Student side (Flutter app):
    -> Ensure you have Node.js and MongoDB installed.
    -> Navigate to the backend directory.
    -> Create a .env file based on .env.example and provide the necessary
        configuration.

4.	Start the servers
  •	cd server
  •	node index.js
Contributing
We welcome contributions to improve the Mess Management System! If you find any bugs, have suggestions, or want to add new features, please open an issue or submit a pull request.
Acknowledgments
This project was developed as part of NIT Calicut's efforts to enhance mess management processes. We appreciate the hard work and dedication of all contributors.

Contact
For any inquiries or assistance, please contact the project maintainers:
  •	Admin Side: admin@example.com
  •	Student Side: student@example.com
Thank you for using the Mess Management System! We hope it simplifies mess operations and enhances the student experience at NIT Calicut.
