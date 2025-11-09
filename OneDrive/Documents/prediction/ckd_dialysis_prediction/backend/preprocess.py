import pandas as pd
import numpy as np
from transformers import BertTokenizer

tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

def preprocess_input(df):
    df = df.fillna(df.mean())

    # Example: select important lab columns
    columns = [col for col in df.columns if col.lower() in ["creatinine", "urea", "albumin", "hemoglobin"]]
    lab_data = df[columns].values

    # Normalize data
    lab_data = lab_data / np.max(lab_data, axis=0)
    lab_data = np.expand_dims(lab_data, axis=0)

    return lab_data
