import pandas as pd
import re
import string

df = pd.read_csv("train.csv")

import contractions

def preprocess(text):
    text = text.lower()  # Convert to lowercase initially
    text = re.sub(r"http\S+|www\S+|https\S+", '', text, flags=re.MULTILINE)  # Remove URLs
    text = re.sub(r'\@w+|\#', '', text)  # Remove @mentions and hashtags
    text = text.translate(str.maketrans('', '', string.punctuation))  # Remove punctuation
    text = re.sub(r'\d+', '', text)  # Remove digits
    text = text.strip()  # Strip whitespaces
    text = re.sub(r"@[A-Za-z0-9_]+", "", text)  # Remove mentions
    text = re.sub(r"&amp;", "&", text)  # Replace HTML encoding
    text = re.sub(r"[^a-zA-Z\s]", "", text)  # Remove non-alphabetic characters
    text = re.sub(r"\s+", " ", text).strip()  # Remove excessive whitespaces

    # Expand contractions (e.g. "I'm" -> "I am")
    text = contractions.fix(text)
    
    # Handle simple negation (e.g. "not happy" -> "not_happy")
    text = re.sub(r"\b(not|no|never|none|n’t|can’t|won’t)\b\s*(\w+)", r"not_\2", text)
    
    return text

df = pd.read_csv("train.csv")

df = df.dropna(subset=["tweet", "class"])


print(df['class'].value_counts())

# Preprocess tweets
df["clean_tweet"] = df["tweet"].apply(preprocess)

df.to_csv("clean_train.csv", index=False)