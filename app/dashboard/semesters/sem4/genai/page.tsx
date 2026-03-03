import SubjectDashboard from "../../common/SubjectDashboard"

const topicOrder = [
  // =====================================================
  // FOUNDATIONS - DATA & NUMERICAL COMPUTING
  // =====================================================

  "Descriptive Statistics",
  "NumPy",
  "Pandas",

  // =====================================================
  // DATA PREPROCESSING
  // =====================================================

  "Data Preprocessing",

  // =====================================================
  // REGRESSION MODELS
  // =====================================================

  "Linear Regression",
  "Regression Metrics",

  // =====================================================
  // CLASSIFICATION MODELS
  // =====================================================

  "Logistic Regression",
  "Classification Metrics",

  // =====================================================
  // TREE-BASED MODELS
  // =====================================================

  "Decision Trees",

  // =====================================================
  // NEURAL NETWORKS
  // =====================================================

  "Introduction to Neural Networks",
  "Multi Layer Perceptron"
];

const mustReviseKeywords = [
  // =====================================================
  // NUMPY & VECTOR OPERATIONS
  // =====================================================

  "Numpy- True False Ladder",
  "Operation on vectors",
  "Implementing a neural network from scratch using Numpy.",

  // =====================================================
  // DATA PREPROCESSING
  // =====================================================

  "Data Preprocessing",
  "Data Preprocessing Exercise",
  "DataPreprocessing_Diseases",

  // =====================================================
  // LINEAR REGRESSION
  // =====================================================

  "Linear Regression",
  "Linear Regression using Sklearn",
  "House prediction using MLR",

  // =====================================================
  // LOGISTIC REGRESSION
  // =====================================================

  "Predicting the Presence of Snakes in Australia Using Logistic Regression",

  // =====================================================
  // DECISION TREES
  // =====================================================

  "DT Classifier",
  "Breast Cancer Diagnosis: Feature Importance",

  // =====================================================
  // METRICS
  // =====================================================

  "Confusion Matrix",

  // =====================================================
  // NEURAL NETWORKS
  // =====================================================

  "Implementing different activation functions and their derivatives",
  "Multi-Layer Perceptron",
  "Train a Neural Network Using PyTorch with Different Activations",

  // =====================================================
  // DATA ANALYSIS MINI CASES
  // =====================================================

  "Monthly Expenses",
  "Employee Salary Range and Department Count Analysis"
];

export default function Page() {
  return <SubjectDashboard subjectName="GenAI" courseTag="GenAI" semesterTitle="Semester 4" topicOrder={topicOrder} mustReviseKeywords={mustReviseKeywords} />
}
