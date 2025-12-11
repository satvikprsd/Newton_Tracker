import SubjectDashboard from "../common/SubjectDashboard"

const topicOrder = [
  // --- Phase 1: Foundations & Database Design ---
  "Relational Databases",
  "ER Diagram",
  "SQL",
  "SQL - DDL",
  "SQL - CREATE Command",
  "SQL Field Constraints",
  "SQL - DML",
  "Database and tables Insertion",

  // --- Phase 2: Basic Querying & Filtering ---
  "SQL Operators",
  "Logical Query Operators",
  "SQL Wildcards",
  "SQL - DISTINCT Clause",
  "SQL - ORDER BY Clause",
  "SQL - LIMIT Clause",

  // --- Phase 3: Functions, Calculation & Aggregation ---
  "SQL Numeric Functions",
  "SQL String Functions",
  "SQL Date & Time Functions",
  "SQL Null Function",
  "SQL Aggregate Functions",
  "COUNT (SQL)",
  "SQL - GROUP BY Clause",
  "SQL - HAVING Clause",
  "SQL - CASE Statement",

  // --- Phase 4: Relationships & Joins (Connecting Data) ---
  "SQL Joins",
  "SQL Inner Join",
  "SQL Left (Outer) Join",
  "SQL Right (Outer) Join",
  "SQL Full (Outer) Join",
  "SQL Self Join",
  "SQL - UNION Operator",
  "SQL - INTERSECT Operator",

  // --- Phase 5: Advanced SQL Logic ---
  "Sub Queries",
  "Non Correlated Subqueries",
  "Correlated Subqueries",
  "Common Table Expressions (CTEs)",
  "SQL Views",

  // --- Phase 6: Performance & Optimization ---
  "Database Indexing",
  "SQL Query Optimization",

  // --- Phase 7: NoSQL / MongoDB Foundations ---
  "MongoDB Tools",
  "MongoDB Insert Methods",
  "MongoDB Find Methods",
  "MongoDB Query Operators",
  "MongoDB $sort",
  "MongoDB Update Methods",
  "MongoDB Update Operators",

  // --- Phase 8: Advanced MongoDB (Aggregation & Data Modeling) ---
  "MongoDB Embedding Documents",
  "MongoDB Querying Related Documents",
  "MongoDB Aggregation Pipeline",
  "MongoDB Aggregation Methods",
  "MongoDB $group",
  "MongoDB $lookup"
];

const mustReviseKeywords = [
  // Core SQL Aggregations & Grouping
  "Departments average salary",
  "SQL- Average Salary",
  "Highest Scorer in each Course",
  "Department-Wise Salary Insights with Employee Count & Filtering",
  "Average Revenue Generated",
  "Total revenue generated",
  "Total revenue and Total seats sold",
  "Highest average sales",
  "SQL- Average Above 40 - MySQL",
  
  // Joins & Relationships
  "Employees and their departments",
  "List All Customers and Their Orders",
  "Customers and their Orders",
  "Departments and their projects",
  "Ecommerce Indexing in Joins",
  "Mongo Lookup",
  "Look Up Mongo stores",
  "Mongo Lookup with 3 Tables",
  "HR",
  "Orders that have actually been placed by customers",
  
  // Filtering & WHERE Clauses
  "Action movies",
  "Movies with higher rating",
  "Price less than 100",
  "Movies released after 1995",
  "Movies released in 1990 or 2008",
  "Sales amount greater than 100",
  "Discount greater than 10.",
  "High Value Sales",
  
  // Subqueries & Advanced Queries
  "3rd highest Salary!!",
  "Top 10 Highest Paid Employees",
  "SQL- Top 5 Highest Runs and Wickets - MySQL",
  "SQL- Highest Paid Workers",
  "Top N Distinct Plants Purchased in a Given Month",
  "Department Heads Earning Less",
  "Identifying High-Spending Customers",
  "Important Customers II",
  "Repeat Customers with High Spending",
  
  // Date Functions
  "Current date",
  "Hire_date",
  "Birthday reminder",
  "Orders were placed in the last 30 days",
  "Project Deadline Tracker",
  "Specific birthday month",
  
  // String Functions
  "Email Domain",
  "Name of Player containing 'r'",
  "Exactly 8 characters",
  "SQL- Twitter Starts with Vowel",
  "Ends with Consonants - MySQL",
  "SQL- Twitter Concat with operator - MySQL",
  "Find and Modify Titles Containing \"the\" and Reverse Author Names ||",
  "Exact 5 letters",
  
  // COUNT & EXISTS
  "Students Not Enrolled in any Course",
  "Atleast 5 employees",
  "Total enrollment",
  "Courses with Submissions",
  "Total number of tournaments",
  "Checking Field Existence and Age Conditions",
  
  // GROUP BY & HAVING
  "Grouping Mongodb",
  "Analysing order using Mongo Group",
  "University Student Grouping Mongo DB",
  "More than One Order",
  "Duplicate Order",
  "Employees with multiple project",
  "Indexing on Group by",
  
  // Window Functions & Rankings
  "Compare Monthly Customer Spending with Average",
  "Sales Performance Comparison by Category",
  "Sales Increase in Q3 Compared to Q2 & Q1",
  "Identifying Overlapping User Segments",
  
  // CASE Statements
  "Platinum, Gold and Silver",
  "Discount categories",
  "Order performance",
  "Grades Brackets-1",
  
  // NULL Handling
  "Coalesce Function",
  "Unassigned",
  "No Laptop",
  "Customers without Laptop",
  
  // INSERT Operations
  "Insert",
  "Insert the Data",
  "Populating a Library Database",
  "SQL - Basic Create and Insert Table_mysql",
  "Create & Insert",
  "New Student in SchoolDB",
  "MongoDB Insert 103",
  
  // UPDATE Operations
  "Update a product",
  "Updating Employee Salaries",
  "Update Phone in MongoDB",
  "Add Availability Field to All Books",
  "Update Cricket Player Scores",
  "Increase the age of all students by 1",
  "Update Employee Experience and Salary",
  "Managing Inventory After Sale",
  
  // DELETE Operations
  "Delete all",
  "SQL - Delete Records from Database",
  "Delete many Products",
  "Delete an Employee Record",
  "Delete and Update Employees Based on Salary",
  
  // DDL Operations
  "Create Table from ER Diagram",
  "Implementing Relations with ER Diagram",
  "University Database",
  "Hospital DB",
  "Add new column",
  "SQL DDL Tasks for a Social Media Platform",
  "Enhancing the Database",
  "SQL - Advanced Alter Table_mysql ||",
  
  // Indexing
  "Delivery indexing",
  "Delivery Table Indexing",
  "Orders Indexing",
  "Indexing Employee",
  "Shipment Indexing",
  
  // MongoDB Specific
  "MongoDB collection customerRecord",
  "User Collection Embedded",
  "Mongo Query: Find",
  "Find the first book",
  "Find Books in MongoDB",
  "Use $nor to Filter Employees",
  "GPA and department",
  "Filter Users by Age and Tag Count",
  "Mongo Optional",
  "Mongo Aggr",
  "Find min and rename",
  
  // Constraints
  "Constraint-3",
  "Constraint-4",
  "Unique Job title",
  
  // Self Joins & Hierarchies
  "Employees who manage other employee",
  "Employee Reporting Structure",
  "Master and Workers",
  "Master and Master's of Master",
  
  // Distinct & Unique
  "Fetch Unique Customer name",
  "Distribution of products",
  
  // Complex Scenarios
  "Identifying Popular \"Pro\" Software Products",
  "Identifying Top-Performing Product Categories",
  "Analyzing Blog Post Engagement",
  "Generate Comprehensive Report",
  "Department Staffing Overview",
  "Summary Report",
  "Business logic"
];

export default function Page() {
  return <SubjectDashboard subjectName="DBMS" courseTag="DBMS" topicOrder={topicOrder} mustReviseKeywords={mustReviseKeywords} />
}
