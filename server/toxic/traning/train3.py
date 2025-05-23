import pandas as pd
import numpy as np
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, StratifiedKFold, GridSearchCV
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.utils.class_weight import compute_class_weight

# Load the dataset
df = pd.read_csv("clean_train.csv")

# Convert to binary classification: 0 = clean, 1 = offensive/hate
df['binary_class'] = df['class'].apply(lambda x: 0 if x == 2 else 1)
X = df["clean_tweet"]
y = df["binary_class"]

# Split data
print("Splitting data...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# Vectorization
vectorizer = TfidfVectorizer(max_features=10000, ngram_range=(1, 2), stop_words='english')
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Compute class weights
class_weights = compute_class_weight('balanced', classes=np.unique(y_train), y=y_train)
class_weight_dict = dict(zip(np.unique(y_train), class_weights))

# Grid Search
print("Performing Grid Search...")
param_grid = {
    'C': [0.01, 0.1, 1, 10, 100],               # Regularization strength
    'penalty': ['l2'],                          # L1 can work with liblinear solver
    'solver': ['liblinear', 'saga'],            # solvers that support L2 and class_weight
    'max_iter': [500, 1000]
}

log_reg = LogisticRegression(class_weight=class_weight_dict, random_state=42)
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
grid_search = GridSearchCV(log_reg, param_grid, scoring='accuracy', cv=cv, verbose=1, n_jobs=-1)

grid_search.fit(X_train_vec, y_train)

print(f"Best Parameters: {grid_search.best_params_}")
print(f"Best Cross-Validation Score: {grid_search.best_score_:.4f}")

# Best model
best_model = grid_search.best_estimator_

# Save model and vectorizer
joblib.dump(best_model, "logistic_regression_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")
print("Saved the best model and vectorizer.")

# Evaluate on test set
y_pred = best_model.predict(X_test_vec)

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

accuracy = accuracy_score(y_test, y_pred)
print(f"Test Accuracy Score: {accuracy:.4f}")
