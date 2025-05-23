import joblib
import re

# Load the trained model and vectorizer
model = joblib.load("logistic_regression_model.pkl")  # Make sure this matches the filename saved
vectorizer = joblib.load("vectorizer.pkl")

# Preprocessing function
def clean_text(text):
    text = re.sub(r"@[A-Za-z0-9_]+", "", text)  # Remove mentions
    text = re.sub(r"http\S+|www\.\S+", "", text)  # Remove URLs
    text = re.sub(r"&amp;", "&", text)  # Clean HTML entities
    text = re.sub(r"[^a-zA-Z\s]", "", text)  # Remove non-alphabetical characters
    return text.lower().strip()

# Function to predict class
def predict_tweet(tweet):
    cleaned = clean_text(tweet)
    vectorized = vectorizer.transform([cleaned])
    prediction = model.predict(vectorized)[0]

    labels = {
        0: "Clean",
        1: "Offensive/Hate"
    }
    return labels.get(prediction, "Unknown")

# Example usage
if __name__ == "__main__":
    sample = "out your negative energy."
    result = predict_tweet(sample)
    print(f"Tweet: {sample}")
    print(f"Predicted class: {result}\n")

    tweets = [
        "I love spending time with my family.",
        "The weather is really nice today!",
        "Let’s play some games after dinner.",
        "Happy birthday to the best friend ever!",
        "She's a great singer and deserves more recognition.",
        "You're such an idiot.",
        "That movie was the worst trash I’ve ever seen.",
        "Stop acting like a moron.",
        "He talks too much crap without thinking.",
        "You're nothing but a loser."
    ]

    for tweet in tweets:
        result = predict_tweet(tweet)
        print(f"Tweet: {tweet}")
        print(f"Predicted class: {result}\n")
