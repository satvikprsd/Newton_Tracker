import SubjectDashboard from "../common/SubjectDashboard"

const topicOrder = [
  // Foundation - Web & HTTP Basics
  "Client-Server Architecture",
  "HTTP Request",
  "HTTP Methods",
  "HTTP Status Codes and Headers",
  "Resource Based URL(s)",
  
  // Node.js Fundamentals
  "Node.js",
  "Node Candidate",
  "Path module- nodejs",
  
  // Synchronous File Operations
  "Node.js fs Module",
  "Node.js Synchronous File Handling",
  
  // Asynchronous JavaScript
  "JavaScript Event Loop",
  "Using async/await",
  "Node.js Asynchronous File Handling",
  
  // Error Handling Basics
  "Node.js Error Handling",
  
  // HTTP Server & Backend Development
  "Node.js http Server",
  "Backend-Development",
  
  // Express.js Basics
  "Folder structure (Express)",
  "Express.js Request",
  "Express.js Response",
  "Express.js Error Handling",
  "Handling HTTP PUT Request",
  
  // Middleware Concept
  "Middlewares in Express",
  
  // REST API Design
  "REST API(s)",
  "CRUD",
  
  // Database Fundamentals
  "Relational Databases",
  "MySQL",
  "Database Transactions",
  
  // ORM & Database Tools
  "Prisma ORM",
  "Prisma Seeding",
  
  // Security - Hashing
  "Hashing",
  
  // Authentication Basics
  "Authentication",
  "Basic Authentication",
  "Authentication Strategies",
  
  // Advanced Authentication
  "JSON Web Tokens",
  
  // Authorization
  "Authorisation",
  "Authentication & Authorisation",
  "Role Based Authorisation",
  
  // Miscellaneous
  "Uncategorized"
];



const mustReviseKeywords = [
  // Node.js Fundamentals (6)
  "Export functions in a Node.js Module",
  "Export variable and a function in Node.js module",
  "Node.js module encapsulation",
  "Sum of the numbers passed in a command-line input",
  "Add two numbers passed as command-line input",
  "Node.js CLI Calculator",
  
  // HTTP Servers (5)
  "Create a HTTP server for GET requests",
  "Create a HTTP route /about",
  "Node.js HTTP server",
  "Create a Server that Serves a File using fs and http",
  "Create a Calculator with Http",
  
  // File System Operations (6)
  "Sum of numbers using fs-module - 2",
  "Todo Application - FS Module - Synchronous operations",
  "Asynchronous File Concatenator",
  "Create a todo asynchronously - 2",
  "Delete todo asynchronously and return Promise",
  "Update todo asynchronously and return Promise",
  
  // Error Handling & Promises (5)
  "JavaScript Try...Catch Error Handling",
  "Handling Asynchronous Errors in Express",
  "Chain Some Math with Promises",
  "Promise.all polyfill",
  "Promise.allSettled polyfill",
  
  // Express.js Basics (4)
  "Refactor - 1 (backend with express.js)",
  "Getting posts",
  "Fetching item with id",
  "Dynamic Route Calculator",
  
  // Express Middleware (7)
  "Middleware: express.json()",
  "TimeStamp Middleware",
  "Validation Middleware",
  "Middleware Token",
  "Authentication Middleware - 2",
  "Validation Middleware — Medium Level",
  "Middleware for Query-Based User Validation in Express.js",
  
  // REST API Design (6)
  "Express REST Update-Delete",
  "Express REST Sorting",
  "Express REST Pagination",
  "Pagination Endpoint in Express",
  "Paginated Search API using GET",
  "API Endpoint Implementation: Product Search and Filtering",
  
  // Simple APIs (4)
  "Simple Blog Post Validator API",
  "Pokémon Directory API",
  "Library Management API",
  "Fetching and Filtering Train Data from an API",
  
  // MySQL Operations (4)
  "Get Product by ID Mysql2",
  "Get Products",
  "Create Products data",
  "Delete Product",
  
  // Prisma Schema & Models (5)
  "Manage schema - Prisma",
  "Create Product Inventory Model using Prisma",
  "Build a Book Table Using Prisma",
  "Build a WebSeries Table Using Prisma",
  "Create a Prisma User Model for WebSeries",
  
  // Prisma CRUD & Operations (5)
  "CRUD operations using Prisma Client",
  "Product: update by id",
  "Filter user with popular posts",
  "Prisma Seeding",
  "Seeding - User with 3 Posts",
  
  // Complete CRUD APIs (4)
  "CRUD API for User Management using Express, Prisma, and MySQL",
  "CRUD API for Product Management using Express, Prisma, and MySQL",
  "CRUD API for Cart Management Using Express, Prisma and MySQL",
  "CRUD API for Shipping Management using Express, Prisma, and MySQL",
  
  // Authentication (7)
  "Hashing & Verification with Bcrypt",
  "Implement a Signup Route with Email Validation",
  "Implement a Login Route for User Authentication",
  "Create a Basic Signup and Login System Using Prisma and Express",
  "Login Api with Node+Prisma",
  "Login api with protected middleware",
  "Simulate Secure API Request Using Bearer Token",
  
  // Authorization (2)
  "Authorization Control",
  "Authorization using Role-Based Access Control(RBAC)"
];


export default function Page() {
  return <SubjectDashboard subjectName="AP" courseTag="AP" excludeCourse="WAP" topicOrder={topicOrder} mustReviseKeywords={mustReviseKeywords} />
}
