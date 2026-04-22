import SubjectDashboard from "../../common/SubjectDashboard"

const topicOrder = [
  // =====================================================
  // OOP FOUNDATIONS
  // =====================================================
  "Classes & Objects",
  "OOP in TS",

  // =====================================================
  // CORE OOP PRINCIPLES
  // =====================================================
  "Encapsulation",
  "Abstraction",
  "Polymorphism",
  "Interfaces",

  // =====================================================
  // SOLID PRINCIPLES
  // =====================================================
  "SOLID Principles",
  "SRP",
  "OCP",
  "LSP",
  "ISP",
  "DIP",

  // =====================================================
  // DESIGN PATTERNS
  // =====================================================
  "Design Patterns",
  "Adapter",
  "Observer",
  "Strategy",
  "Factory",
  "Singleton",
  "Template Method",
  "Composite",

  // =====================================================
  // DATABASE FUNDAMENTALS
  // =====================================================
  "DBMS",
  "Data Modeling - Entities",
  "Normalization",

  // =====================================================
  // DATABASE OPTIMIZATION
  // =====================================================
  "Database Indexing",

  // =====================================================
  // SYSTEM DESIGN
  // =====================================================
  "SESD"
];

const mustReviseKeywords = [
  // =====================================================
  // CLASSES & OBJECTS
  // =====================================================
  "Constructor with Default Parameters – Book Class",
  "Parameterized Book Creation",
  "Book Constructor Overloading",
  "Product Class with Constructor",
  "Create bank account",
  "Student Record",
  "Implement Classes from UML Diagrams",

  // =====================================================
  // ENCAPSULATION & INVARIANTS
  // =====================================================
  "BankAccount Class with Invariants",
  "Contact Management with Invariants",
  "BankAccount with Transaction History",
  "Reliable and observable Domain Class",

  // =====================================================
  // ABSTRACTION & INTERFACES
  // =====================================================
  "Smart Home Automation System (Interface & Abstract Class)",
  "Smart Device Connectivity System (Interface & Abstract Class)",
  "Abstract Document Renderer",
  "User Login Session",
  "DTO and Domain Object",
  "Abstract Vehicle Service System",

  // =====================================================
  // POLYMORPHISM & INHERITANCE
  // =====================================================
  "Polymorphic Shape Area Calculator",
  "Inheritance vs Composition: Library Management System",
  "Transport System: Inheritance and Composition in TypeScript",
  "Notifier System",
  "Payment Systems",

  // =====================================================
  // OBSERVER PATTERN
  // =====================================================
  "EventBus Observer Pattern",
  "NewsChannel (publisher)",
  "Observer pattern TemperatureSensor",
  "YouTube Subscription - Observer",

  // =====================================================
  // STRATEGY PATTERN
  // =====================================================
  "Payment Processing System with Strategy Pattern",
  "Notification System with Strategy Pattern and Validation",
  "Complete Payment Service System with Strategy Pattern",

  // =====================================================
  // TEMPLATE METHOD PATTERN
  // =====================================================
  "File Logger System with Template Method Pattern",
  "Data Processing System with Template Method Pattern",
  "Report Generator Using Template Method Pattern",

  // =====================================================
  // COMPOSITE PATTERN
  // =====================================================
  "Graphic System with Composite Pattern",
  "Restaurant Menu System with Composite Pattern",
  "E-Commerce Product Hierarchy with Composite Pattern",

  // =====================================================
  // ADAPTER PATTERN
  // =====================================================
  "Simple Printer Adapter Pattern",
  "Temperature Adapter for Weather APIs",
  "Multi-Database Adapter System",

  // =====================================================
  // SINGLETON PATTERN
  // =====================================================
  "Singleton Pattern – Config Manager",
  "Singleton Pattern – Logger",
  "Singleton Pattern – ID Generator",
  "Singleton & Factory Pattern – Theme Manager",

  // =====================================================
  // FACTORY PATTERN
  // =====================================================
  "Factory Pattern – Notification System",
  "Factory Pattern – Shape Drawing",
  "Factory Pattern – Audio Player Sounds",

  // =====================================================
  // SOLID (IMPORTANT DESIGN QUESTIONS)
  // =====================================================
  "Refactor Notification Service Using Dependency Inversion",
  "Refactor Order Service to Follow Dependency Inversion Principle",
  "Design a Logger System with Safe Substitution and Dependency Injection",
  "Design a Printer System Using Interface Segregation",
  "Refactor a Fat Interface Using Interface Segregation Principle (ISP)",
  "Split a Notification Interface Using Interface Segregation Principle",
  "Design a Media Player System with Correct Interface Usage",
  "Ensure Safe Substitution in a Shape System",
  "Refactor Account Design to Follow Liskov Substitution Principle (LSP)",
  "Design a Payment System That Follows ISP",
  "Design a Worker System with Safe Role Separation",

  // =====================================================
  // DATA MODELING & ER DIAGRAMS
  // =====================================================
  "ER Diagram - Student Enrollment",
  "ER Diagram Worksheet",
  "ER Diagram Practice",
  "Normalization of Parking Records",

  // =====================================================
  // DATABASE INDEXING
  // =====================================================
  "Orders Indexing",
  "Shipment Indexing",

  // =====================================================
  // SQL PRACTICE
  // =====================================================
  "SQL- Average Above 40 - MySQL",
  "Movies released in 1990 or 2008",
  "Orders that have actually been placed by customers",
  "Count of Students with Grade A",
  "Highest Batting Average",

  // =====================================================
  // MINI SYSTEM DESIGN CASES
  // =====================================================
  "Appliance Power Consumption",
  "Temperature sensor",
  "Temperature sensor with alert",
  "Course Enrollment Management",
  "University Student Fee System",
  "Billing System",
  "User Registration DataBase",
  "Pizza Ordering System",
  "Traffic Signal System",
  "Traffic Control System"
];

export default function Page() {
  return <SubjectDashboard subjectName="SD" courseTag="SD" semesterTitle="Semester 4" topicOrder={topicOrder} mustReviseKeywords={mustReviseKeywords} />
}
