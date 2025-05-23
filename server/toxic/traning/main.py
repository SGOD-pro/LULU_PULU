import joblib
import re

# Load the trained model and vectorizer
model = joblib.load("random_forest_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Preprocessing function
def clean_text(text):
    text = re.sub(r"@[A-Za-z0-9_]+", "", text)
    text = re.sub(r"http\S+|www.\S+", "", text)
    text = re.sub(r"&amp;", "&", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    return text.lower().strip()

# Function to predict class
def predict_tweet(tweet):
    cleaned = clean_text(tweet)
    vectorized = vectorizer.transform([cleaned])
    prediction = model.predict(vectorized)[0]
    
    labels = {
        0: "Hate Speech",
        1: "Offensive Language",
        2: "Neither"
    }
    return labels[prediction]

# Example usage
if __name__ == "__main__":
    tweet = input("Enter a tweet: ")
    result = predict_tweet(tweet)
    print(f"Predicted class: {result}")

    
if __name__ == "__main__":
    main()
