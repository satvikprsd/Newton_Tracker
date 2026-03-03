import SubjectDashboard from "../../common/SubjectDashboard"
const topicOrder = [
  // =====================================================
  // EXCEL / SPREADSHEET - COMPLETE FIRST
  // =====================================================

  // Basics
  "Spreadsheet-Data Types",
  "Cell referencing",
  "Array formulas",
  "Simple Multiply",

  // Logical & Conditional Functions
  "Logical operations",
  "Spreadsheet-Logical Functions",
  "Using Logical functions in Excel",
  "Error handling using IFERROR & IFNA",

  // String & Text Handling
  "Spreadsheet - String Functions",
  "Length Function",
  "Text to columns",
  "Text Split",
  "Flash Fill",
  "Fill Handle functionality in Sheets",

  // Date & Time
  "Excel Date & Time Functions",
  "Spreadhsheet - Date & Time functions",
  "Employee Hire Dates",
  "Calculating Celebrities' Current Age",

  // Lookup & Reference
  "VLOOKUP Function",
  "HLOOKUP Function",
  "XLOOKUP Function",
  "INDEX() + MATCH()",
  "Combining VLOOKUP & MATCH",

  // Sorting & Filtering
  "Sorting and filtering data",
  "Advanced Sorting",
  "Data Filtering-Spreadsheet",
  "Data Filtering and Sorting",

  // Aggregations & Pivot Tables
  "Aggregation functions",
  "Spreadsheet - Aggregate Functions",
  "Conditional Aggregations",
  "Pivot Tables",
  "Pivot Table Testing",
  "AVG Count and Sum Pivot",

  // Data Cleaning in Excel
  "Data preparation in Spreadsheets",
  "Data Cleaning - Removing Duplicates",
  "Improving Data Integrity and Accuracy by Removing Duplicates",
  "Order Priority Data Validation",

  // Charts & Reporting
  "Creating and formatting basic charts",
  "Creating charts from orders",
  "Line Chart Visuals",
  "Charts and Pivot table on Orders- Online and offline",

    // =====================================================
  // VISUALIZATION & DASHBOARDING
  // =====================================================

  "Visualization of Data",
  "Reporting and Dashboarding",
  "Dashboard creation 1",
  "HR Analytics Dashboard.",

  // Course Wrap-up
  "DVA",

  // =====================================================
  // NUMPY - FOUNDATION FOR PANDAS
  // =====================================================
  
  "Accessing Array Elements",
  "Arithmatic Operations in NumPy",
  "NumPy-Vectorized Operations",
  "NumPy-Matrix Operations",
  "Broadcasting in NumPy",
  "Array Reshaping and Arithmetic Operations",
  "Matrix Manipulation",
  "Addition and Subtraction",

  // =====================================================
  // PANDAS - DATA ANALYTICS CORE
  // =====================================================

  // Pandas Basics
  "Pandas",
  "Pandas DataFrame",

  // Filtering & Sorting
  "Data Filtering  - Pandas",
  "Sorting Data - Pandas",
  "Handling missing values",
  "Missing Data Handling",

  // Grouping & Aggregation
  "Groupby Operations - Pandas",
  "Data Grouping-Pandas",
  "Data Pivoting-Pandas",
  "Data Aggregation",
  "Descriptive Statistics",

  // Data Cleaning
  "Pandas Data Cleaning",
  "Data Type Audit in the Employee Dataset",
  "Customer Data Cleaning",
  "Employee Master Data Cleanup & Filtering",

  // Data Transformation
  "Data Manupulation",
  "Advanced Data Transformation and Reshaping",
  "Join, Merge, Concat, Append (Pandas)",
  "The Enigmatic Merge Mastery",
  "Joining DataFrames and Summing Quantities by ID",

  // Python Analytics
  "Python- Data Cleaning",
  "Python- Data Analyzing",
  "2 Level Analysis",
  "Salaries Categorization and Outlier Detection",
];

const mustReviseKeywords = [
  // NumPy Core
  "Numpy array functions",
  "Broadcasting in NumPy",
  "Array Reshaping and Arithmetic Operations",
  "Matrix Manipulation",
  "Tempreature_Data",

  // Spreadsheet Lookup & Logic
  "Student Grades using XLOOKUP",
  "Airline Crew Dynamic Lookup",
  "Extracting EU Immigration Statistics with HLOOKUP",
  "Stationery Store Price and Category Retrieval",
  "Extracting Product Details",
  "Employee Details for Custom Emails",
  "Determining Student Pass/Fail Status Using IF Logic",
  "Determining Scholarship Eligibility Using IF + AND Logic",
  "Identifying Student Presence Using ISBLANK and IF Logic",
  "Leveraging Shoe Data",
  "Length Function",
  "Employee Function",
  "Advanced Sorting",
  "Audi Diesel Price Analysis",
  "Cleaning Product",
  "Data Cleaning - Removing Duplicates",
  "Customer Data Cleaning",
  "Salaries Categorization and Outlier Detection",

  // Pivot & Aggregation
  "Student Performance & Fee Summary Using Conditional Aggregation",
  "Attendance Insights & Financial Summary",
  "AVG Count and Sum Pivot",
  "Pivot Table Testing",
  "Salary Aggregation",
  "Groupby and Aggregation",

  // Data Cleaning
  "Improving Data Integrity and Accuracy by Removing Duplicates",
  "Customer Data Cleaning",
  "Employee Master Data Cleanup & Filtering",
  "Handling Null",
  "Missing Data Handling",
  "Employee Attendance Cleanup Report",

  // Pandas Merge & Transform
  "The Enigmatic Merge Mastery",
  "Joining DataFrames and Summing Quantities by ID",
  "Advanced Data Transformation and Reshaping",
  "City Sales Data Standardization",
  "Transforming Sales Data for Insights",

  // HR & Employee Analytics
  "HR Analytics Dataset Insights Query",
  "Frequency Count - HR Analytics",
  "HR Analytics - WorkLifeBalance",
  "Employee Data Analysis",
  "Analyze Employee Compensation Components for Fairness",
  "Employee Annual Increment Analysis",
  "Employee Data Integration",
  "Monthly Salary Analysis",

  // Sales & Business Analytics
  "Sales data analysis",
  "Sales Transaction Analysis by Region and Product",
  "Sales Data Filtering, Sorting, and Product Frequency Analysis",
  "Branch Revenue Generation",
  "Maximum Sales Improvement",
  "Product Revenue Contribution Percentage per Order",
  "Calculating Adjusted Revenue per Category",

  // Academic & Student Analytics
  "Student Dataset Analysis for Educational Insights",
  "Student Performance Analysis and Top Performers Identification",
  "Analyzing Academic Performance: Subject Scores and Gender Disparities",
  "Student Placement Analysis",

  // Dashboard & Visualization
  "Dashboard creation 1",
  "HR Analytics Dashboard.",
  "Visualization of Data",
  "Line Chart Visuals",

  // Advanced Case Studies
  "Health Indicators and Outcome Analysis",
  "Top 5 States with Most 5-Star Businesses",
  "Zomato Data Analyst",
  "Transportation Data: Routes, Vehicles, and Passengers"
];

export default function Page() {
  return <SubjectDashboard subjectName="DVA" courseTag="DVA" semesterTitle="Semester 4" topicOrder={topicOrder} mustReviseKeywords={mustReviseKeywords} />
}
