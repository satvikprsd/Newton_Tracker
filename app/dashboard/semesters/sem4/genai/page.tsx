import SubjectDashboard from "../../common/SubjectDashboard"
const topicOrder = [
  "NumPy",
  "Pandas",
  "Data Preprocessing",
  "Linear Regression",
  "Regression Metrics",
  "Logistic Regression",
  "Classification Metrics",
  "Decision Trees",
  "Introduction to Neural Networks",
  "Neural Networks",
  "Multi Layer Perceptron",
  "Machine Learning Model Evaluation",
  "NLP",
  "Embeddings",
  "Image Models",
  "Agentic AI",
  "Conditional Branching",
  "LangGraph",
  "Sense–Decide–Act",
  "State Management of AI Agents",
  "Prompt Evaluation",
  "Zero-Shot Prompting",
  "Uncategorized"
];

const mustReviseKeywords = [
  // NumPy & Pandas
  "array",
  "ndarray",
  "vector operations",
  "broadcasting",
  "reshape",
  "indexing",
  "slicing",
  "aggregation",
  "boolean masking",
  "DataFrame",
  "Series",
  "groupby",
  "merge",
  "missing values",
  "data cleaning",

  // Data Preprocessing
  "normalization",
  "standardization",
  "encoding",
  "label encoding",
  "one hot encoding",
  "feature scaling",
  "train test split",
  "imputation",

  // Linear Regression
  "simple linear regression",
  "multiple linear regression",
  "coefficient",
  "intercept",
  "gradient descent",
  "sklearn linear regression",

  // Regression Metrics
  "MAE",
  "MSE",
  "RMSE",
  "R2 score",

  // Logistic Regression
  "sigmoid",
  "binary classification",
  "decision boundary",
  "probability prediction",

  // Classification Metrics
  "confusion matrix",
  "accuracy",
  "precision",
  "recall",
  "f1 score",
  "ROC AUC",

  // Decision Trees
  "entropy",
  "gini impurity",
  "information gain",
  "decision tree classifier",

  // Neural Networks
  "perceptron",
  "activation functions",
  "relu",
  "sigmoid activation",
  "tanh",
  "softmax",
  "forward propagation",
  "backpropagation",
  "loss function",
  "gradient descent",
  "weights and biases",

  // MLP
  "hidden layers",
  "multi layer perceptron",
  "PyTorch neural network",
  "numpy neural network",

  // NLP
  "tokenization",
  "stopwords",
  "stemming",
  "lemmatization",
  "bag of words",
  "TF-IDF",
  "CountVectorizer",
  "Naive Bayes",
  "LinearSVC",
  "n-grams",

  // Embeddings & Image Models
  "vector embeddings",
  "semantic similarity",
  "cosine similarity",
  "image classification",

  // Agentic AI
  "agents",
  "tool calling",
  "decision making",
  "workflow automation",
  "evaluation agents",

  // LangGraph
  "nodes",
  "edges",
  "conditional routing",
  "state management",

  // Prompting
  "zero-shot prompting",
  "prompt evaluation",
  "reasoning chains",

  // General ML
  "overfitting",
  "underfitting",
  "cross validation",
  "bias variance tradeoff"
];

export default function Page() {
  return <SubjectDashboard subjectName="GenAI" courseTag="GenAI" semesterTitle="Semester 4" topicOrder={topicOrder} mustReviseKeywords={mustReviseKeywords} />
}
