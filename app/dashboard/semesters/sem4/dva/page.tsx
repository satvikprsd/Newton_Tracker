import SubjectDashboard from "../../common/SubjectDashboard"

const topicOrder = [
  // =====================================================
  // SPREADSHEET / EXCEL - FOUNDATION
  // =====================================================

  "Spreadsheet-Data Types",
  "Cell referencing",
  "Array formulas",

  // =====================================================
  // LOGICAL & CONDITIONAL
  // =====================================================

  "Spreadsheet-Logical Functions",
  "Error handling using IFERROR & IFNA",

  // =====================================================
  // STRING & TEXT
  // =====================================================

  "Spreadsheet - String Functions",
  "Text to columns",
  "Flash Fill",

  // =====================================================
  // DATE & TIME
  // =====================================================

  "Spreadhsheet - Date & Time functions",

  // =====================================================
  // LOOKUPS (VERY IMPORTANT)
  // =====================================================

  "VLOOKUP Function",
  "HLOOKUP Function",
  "XLOOKUP Function",
  "INDEX() + MATCH()",
  "Combining VLOOKUP & MATCH",

  // =====================================================
  // FILTERING & SORTING
  // =====================================================

  "Data Filtering-Spreadsheet",

  // =====================================================
  // AGGREGATION & PIVOTS
  // =====================================================

  "Spreadsheet - Aggregate Functions",
  "Conditional Aggregations",
  "Pivot Tables",

  // =====================================================
  // DATA CLEANING (EXCEL)
  // =====================================================

  "Data preparation in Spreadsheets",

  // =====================================================
  // VISUALIZATION & DASHBOARDING
  // =====================================================

  "Creating and formatting basic charts",
  "Reporting and Dashboarding",

  // =====================================================
  // COURSE WRAP
  // =====================================================

  "DVA",

  // =====================================================
  // NUMPY - CORE FOUNDATION
  // =====================================================

  "NumPy Basics",
  "Accessing Array Elements",
  "NumPy-Indexing & Slicing",
  "Arithmatic Operations in NumPy",
  "NumPy-Vectorized Operations",
  "NumPy-Matrix Operations",

  // =====================================================
  // PANDAS - CORE ANALYTICS
  // =====================================================

  "Data Filtering - Pandas",
  "Handling missing values",
  "Data Grouping-Pandas",
  "Data Pivoting-Pandas",
  "Descriptive Statistics",
  "Join, Merge, Concat, Append (Pandas)",

  // =====================================================
  // PYTHON ANALYTICS LAYER
  // =====================================================

  "Python- Data Cleaning",
  "Python- Data Analyzing",

  // =====================================================
  // EDA (MOST IMPORTANT FOR INTERVIEWS)
  // =====================================================

  "Univariate Analysis",
  "Bivariate Analysis",
  "Multivariate Analysis",
  "Correlation Analysis - Pandas",

  // =====================================================
  // DISTRIBUTIONS & OUTLIERS
  // =====================================================

  "Data distributions",
  "Percentile and Quantiles",
  "Outlier Detection",

  // =====================================================
  // VISUALIZATION (PYTHON)
  // =====================================================

  "Matplotlib & seaborn",
  "Visualizing Univariate Categorical Data",
  "Visualizing Univariate Numerical Data"
];

const mustReviseKeywords = [
  // =====================================================
  // EXCEL CORE LOGIC & LOOKUPS
  // =====================================================

  "Student Grades using XLOOKUP",
  "Airline Crew Dynamic Lookup",
  "Extracting EU Immigration Statistics with HLOOKUP",
  "Stationery Store Price and Category Retrieval",
  "Extracting Product Details",
  "Employee Details for Custom Emails",

  "Determining Student Pass/Fail Status Using IF Logic",
  "Determining Scholarship Eligibility Using IF + AND Logic",
  "Identifying Student Presence Using ISBLANK and IF Logic",

  // =====================================================
  // DATA CLEANING (HIGH PRIORITY)
  // =====================================================

  "Data Type Audit in the Employee Dataset",
  "Data Quality Analysis 2",
  "Improving Data Integrity and Accuracy by Removing Duplicates",
  "Customer Data Cleaning",
  "Employee Master Data Cleanup & Filtering",
  "Employee Attendance Cleanup Report",
  "Handling Null",
  "Missing Data Handling",
  "Cleaning Product",

  // =====================================================
  // PIVOT & AGGREGATION
  // =====================================================

  "Student Performance & Fee Summary Using Conditional Aggregation",
  "Attendance Insights & Financial Summary",
  "Attendance-Based Department Evaluation",
  "AVG Count and Sum Pivot",
  "Pivot Table Testing",
  "Salary Aggregation",
  "Groupby and Aggregation",

  // =====================================================
  // NUMPY CORE
  // =====================================================

  "Numpy array functions",
  "Broadcasting in NumPy",
  "Array Reshaping and Arithmetic Operations",
  "Matrix Manipulation",
  "Addition and Subtraction",

  // =====================================================
  // PANDAS TRANSFORMATION & MERGE
  // =====================================================

  "The Enigmatic Merge Mastery",
  "Joining DataFrames and Summing Quantities by ID",
  "Advanced Data Transformation and Reshaping",
  "City Sales Data Standardization",
  "Transforming Sales Data for Insights",
  "Enhanced Customer Transaction Data Formatting",

  // =====================================================
  // SALES & BUSINESS ANALYTICS
  // =====================================================

  "Sales data analysis",
  "Sales Transaction Analysis by Region and Product",
  "Sales Data Filtering, Sorting, and Product Frequency Analysis",
  "Branch Revenue Generation",
  "Maximum Sales Improvement",
  "Product Revenue Contribution Percentage per Order",
  "Calculating Adjusted Revenue per Category",
  "Monthly sales data for three different products",

  // =====================================================
  // HR & EMPLOYEE ANALYTICS
  // =====================================================

  "HR Analytics Dataset Insights Query",
  "Frequency Count - HR Analytics",
  "HR Analytics - WorkLifeBalance",
  "Employee Data Analysis",
  "Analyze Employee Compensation Components for Fairness",
  "Employee Annual Increment Analysis",
  "Employee Data Integration",
  "Monthly Salary Analysis",

  // =====================================================
  // STUDENT / EDUCATION ANALYTICS
  // =====================================================

  "Student Dataset Analysis for Educational Insights",
  "Student Performance Analysis and Top Performers Identification",
  "Analyzing Academic Performance: Subject Scores and Gender Disparities",
  "Student Placement Analysis",

  // =====================================================
  // VISUALIZATION & DASHBOARD
  // =====================================================

  "Dashboard creation 1",
  "HR Analytics Dashboard.",
  "Visualization of Data",
  "Line Chart Visuals",
  "Creating charts from orders",

  // =====================================================
  // EDA & STATISTICS (VERY IMPORTANT)
  // =====================================================

  "Correlation Analysis - Pandas",
  "Sales Data Correlation Strength",
  "Regional Purchase Correlation",
  "Marketing Effectiveness Score",

  "Univariate Analysis using Histogram",
  "Univariate Analysis using Bar Graph",
  "Univariate Analysis using Box Plot",

  "Distribution Shape Detection Using Skewness",
  "Compute Quartiles and 90th Percentile of Scores",

  // =====================================================
  // OUTLIER DETECTION
  // =====================================================

  "Outlier Detection Using IQR Method",
  "Detect Outliers Using IQR Method",
  "Remove Outliers Using IQR Method",
  "Purchase Outlier Detection using IQR",

  // =====================================================
  // ADVANCED CASE STUDIES
  // =====================================================

  "Zomato Data Analyst",
  "Top 5 States with Most 5-Star Businesses",
  "Health Indicators and Outcome Analysis",
  "Retail Analytics: Bivariate Relationship Analysis",
  "Financial Risk Analysis: Transaction Behavior Study",
  "Hospital Recovery Pattern Analysis 1",
  "EdTech Platform: Study Behavior & Performance Analysis",
  "Transportation Data: Routes, Vehicles, and Passengers"
];

export default function Page() {
  return <SubjectDashboard subjectName="DVA" courseTag="DVA" semesterTitle="Semester 4" topicOrder={topicOrder} mustReviseKeywords={mustReviseKeywords} />
}
