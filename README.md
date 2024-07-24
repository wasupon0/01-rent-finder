# RentFinder

_Simplifying Apartment Searches_
<br/><br/>
![hero](./public/readme-img-01.png)
<br/><br/>

## Overview

RentFinder helps you quickly and easily find the perfect apartment that fits your preferences and budget.
<br/><br/>

## Tech Stack

![diagram](./public/project-01-filled.png)


### Front-End
#### Next.js:
- Next.js, a React framework, is used for server-side rendering (SSR) in RentFinder, enhancing performance and SEO.
- It supports static site generation (SSG), ensuring fast loading times and efficient handling of dynamic content.
- This framework enables seamless navigation and interaction within the application, providing a superior user experience.
  
#### Tailwind CSS:
- Tailwind CSS is a utility-first CSS framework that allows for rapid and flexible UI development in RentFinder.
- It helps maintain a clean and maintainable codebase, making it easier to implement and manage styles.
- This framework enhances the overall user experience by providing a visually consistent and intuitive interface for navigating and searching properties.

### Back-End
The back-end of RentFinder is robustly handled by Next.js, which is not just a front-end framework but a full-stack solution. Next.js provides powerful features like the App Router and Route Handlers that significantly improve the developer's experience.

#### Route Handlers:
- RentFinder uses route handler files (route.js) within the app directory to manage API routes, allowing for clean and maintainable code.
- Each HTTP method (GET, POST, PUT, DELETE) is handled separately within these files, enhancing code modularity and clarity.
- This approach simplifies the creation and management of endpoints, such as app/api/properties/user/[userId]/route.js to manage each user's property listings.

#### Authentication:
- RentFinder integrates NextAuth.js for authentication, simplifying the process of adding secure Google authentication.
- NextAuth.js has built-in support for GoogleProvider, ensuring seamless login with Google accounts.

#### Middleware Functions:
- Middleware functions in Next.js enhance RentFinder's back-end by processing requests at various stages.
- These functions are used for tasks such as authentication, logging, and data validation, ensuring secure and optimized data handling.

### Database
#### MongoDB:
- RentFinder utilizes MongoDB, a NoSQL database, to manage complex data structures such as property listings and user information.
- Its document-based model efficiently handles and organizes the diverse data types required for the application.

#### Cloudinary:
- Cloudinary is used for image storage and management, ensuring efficient handling of property images.
- This ensures that property images are delivered quickly and without compromising on quality, enhancing the user experience.
<br/><br/>

## Features

### Search By Keyword Feature

https://github.com/user-attachments/assets/78975413-5fe2-4c86-8529-b4c86c3dab51

The search feature allows you to search for apartments by using keywords. You can search by city, how many minutes to train station, and filter the price range.
<br/><br/>

---

### Authentication Feature

https://github.com/user-attachments/assets/a9cef685-3f6e-4ba4-b341-991fe876a26f

By leveraging NextAuth.js, and Google provider. Users can easily sign in to add or edit a property. User profile will be automatically created by retrieving user data such as name, email, and profile picture from their google account.
<br/><br/>

---

### Add Property Feature

https://github.com/user-attachments/assets/f3c29d1b-1a52-4502-be17-3edd15a97e44

The add property feature allows you to add a new property to the database. After logged in, the property manager can add a new property by filling out the form and upload images.
<br/><br/>

---

### Property Details Feature

https://github.com/user-attachments/assets/fae5f05e-adf7-41fa-8e9f-8e9854d86c07

When a user clicks on a property card, they will be directed to the property details page. The page contains all the property details information in sections. The cost section provides monthly costs, fees, and deposit information. The description section gives details such as room sizes, amenities, building age, and distance from the train station. It also includes room pictures and the property's map location.
<br/><br/>

---

### Bookmark and Messaging Feature

https://github.com/user-attachments/assets/b33594af-a574-40aa-b251-4d764e9986c0

When you find a property that you are interested in, you can saved it to your bookmark list. You can also send a message to the property owner to ask for more information.
<br/><br/>

---

### Profile Listing Edit Feature

https://github.com/user-attachments/assets/4174b7f7-54e9-4c73-9d19-46330c647fd2

In the profile page, property owner can view all of their property listings. They can also edit or delete the property details.
