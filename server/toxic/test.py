import joblib
import re
import os

# ✅ Ensure we load the model relative to this file
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "logistic_regression_model.pkl")
VECTOR_PATH = os.path.join(BASE_DIR, "vectorizer.pkl")

# Load the trained model and vectorizer
with open(MODEL_PATH, "rb") as f:
    model = joblib.load(f)

with open(VECTOR_PATH, "rb") as f:
    vectorizer = joblib.load(f)


# Preprocessing function
def clean_text(text):
    text = re.sub(r"@[A-Za-z0-9_]+", "", text)  # Remove mentions (@username)
    text = re.sub(r"http\S+|www.\S+", "", text)  # Remove URLs
    text = re.sub(r"&amp;", "&", text)  # Clean HTML entities
    text = re.sub(r"[^a-zA-Z\s]", "", text)  # Remove non-alphabetical characters
    return text.lower().strip()  # Convert to lowercase and strip whitespace

# Function to predict class
def predict_tweet(tweet):
    cleaned = clean_text(tweet)
    vectorized = vectorizer.transform([cleaned])
    prediction = model.predict(vectorized)[0]

    labels = {
        0: "Clean",
        1: "Offensive/Hate"
    }
    return labels.get(prediction, "Unknown")!="Clean"
predict_tweet("Hle")