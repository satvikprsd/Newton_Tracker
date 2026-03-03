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
  // DESIGN PATTERNS
  // =====================================================

  "Design Patterns",
  "Adapter",

  // =====================================================
  // DATABASE FUNDAMENTALS
  // =====================================================

  "DBMS",
  "Data Modeling - Entities",

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

  "Smart Home Automation System (Interfaces & Abstract Classes)",
  "Smart Device Connectivity System (Interface & Abstract Class)",
  "Abstract Document Renderer",
  "User Login Session",
  "DTO and Domain Object",

  // =====================================================
  // POLYMORPHISM & INHERITANCE
  // =====================================================

  "Polymorphic Shape Area Calculator",
  "Inheritance vs Composition: Library Management System",
  "Transport System: Inheritance and Composition in TypeScript",
  "Notifier System",
  "Payment Systems",

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

  "Abstract Vehicle Service System",
  "Appliance Power Consumption",
  "Temperature sensor",
  "Temperature sensor with alert",
  "Course Enrollment Management",
  "University Student Fee System"
];

export default function Page() {
  return <SubjectDashboard subjectName="SD" courseTag="SD" semesterTitle="Semester 4" topicOrder={topicOrder} mustReviseKeywords={mustReviseKeywords} />
}
