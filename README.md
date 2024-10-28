# Eventrix - Calendar Application

## URL : https://eventrix-seven.vercel.app/

## Overview

Eventrix is a modern, fully responsive event calendar application that simplifies event scheduling and management. Designed to cater to all screen sizes and mobile devices, Eventrix offers a seamless user experience on any platform. This app leverages powerful tools and libraries to provide an intuitive, robust, and flexible scheduling solution, making it ideal for users who require efficient event scheduling.

## Screens

<img width="1710" alt="Screenshot 2024-10-28 at 9 38 04 AM" src="https://github.com/user-attachments/assets/5ad7a6b5-4e27-4768-8888-a73c118f98d0">
<img width="1710" alt="Screenshot 2024-10-28 at 9 38 51 AM" src="https://github.com/user-attachments/assets/48506dc9-074f-4a81-9507-f4efe758ff45">
<img width="1710" alt="Screenshot 2024-10-28 at 9 38 20 AM" src="https://github.com/user-attachments/assets/389894f1-dbbd-4dcd-b670-1f2f098e9b65">
<img width="1710" alt="Screenshot 2024-10-28 at 9 38 27 AM" src="https://github.com/user-attachments/assets/8fbde6b7-c387-478f-818b-5a9a0611333c">
<img width="300" alt="Screenshot 2024-10-28 at 9 39 54 AM" src="https://github.com/user-attachments/assets/16603585-dbff-4e88-8ed0-99d34db77e41">
<img width="300" alt="Screenshot 2024-10-28 at 9 40 19 AM" src="https://github.com/user-attachments/assets/76f7995a-0460-410b-af7b-6a8ba5dc53d8">
<img width="300" alt="Screenshot 2024-10-28 at 9 40 01 AM" src="https://github.com/user-attachments/assets/8c17d5d9-35ec-4861-a4cc-63785cfbb854">


## Features

- **Advanced Event Scheduling**: Schedule, edit, and manage events effortlessly with a user-friendly interface.
- **Categorise Events**: Organize events into different categories for better tracking and management.
- **Advanced State Management**: Ensure smooth and optimized data flow and state updates using **Zustand**, making the app highly consistent and efficient.
- **Form Validations**: Utilize **React Hook Form** and **Zod** for robust form validations, ensuring accurate data input and an error-free user experience.
- **Smooth Animations**: Enhance user interaction with elegant and seamless animations powered by **Framer Motion**, adding a dynamic and engaging feel to the app.


## Project Structure

Eventrix is built with **Next.js**, styled with **Tailwind CSS**, and uses **TypeScript** for type safety. The app is structured with modularity and scalability in mind, making it easier to add new features and maintain existing ones.

### Key Directories

- `components/` - Reusable UI components used throughout the application.
- `data/` - Contains Constants used throughout the application.
- `store/` - Application-wide state management.
- `utils/` - Utility functions, including date helpers.
- `styles/` - Global styling with Tailwind CSS.

## NPM Packages

Eventrix utilizes several npm packages to enhance functionality and developer experience:

- **[date-fns](https://date-fns.org/)** - A modern JavaScript date utility library for date manipulation.
- **[framer-motion](https://www.framer.com/motion/)** - Animation library for React, enabling smooth transitions and animations.
- **[react-hook-form](https://react-hook-form.com/)** - A lightweight library for form handling and validation.
- **[zod](https://zod.dev/)** - TypeScript-first schema validation with static type inference.
- **[zustand](https://github.com/pmndrs/zustand)** - A small, fast, and scalable state management solution for React applications.
- **[tailwindcss](https://tailwindcss.com/)** - A utility-first CSS framework for building responsive, fast UIs.

## Getting Started

To run this project locally, ensure you have **Node.js** and **npm** installed. Clone the repository and install the dependencies:

````bash
git clone https://github.com/yourusername/Eventrix.git
cd Eventrix
npm install

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
