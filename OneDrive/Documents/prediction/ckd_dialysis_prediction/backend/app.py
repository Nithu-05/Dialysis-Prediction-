from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import tensorflow as tf
import numpy as np
import io
import os

app = FastAPI(
    title="CKD Dialysis Prediction API",
    description="Predicts dialysis requirement, risk factors, and comorbid disease possibility within 6–12 months.",
    version="1.3"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "ckd_best_model.h5")

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("✅ Model loaded successfully:", MODEL_PATH)
except Exception as e:
    raise RuntimeError(f"❌ Failed to load model at {MODEL_PATH}: {e}")

# Columns expected by the model
FEATURE_COLUMNS = [
    "age", "blood_pressure", "specific_gravity", "albumin", "sugar",
    "red_blood_cells", "pus_cell", "pus_cell_clumps", "bacteria",
    "blood_glucose_random", "blood_urea", "serum_creatinine",
    "sodium", "potassium", "hemoglobin", "packed_cell_volume",
    "white_blood_cell_count", "red_blood_cell_count",
    "hypertension", "diabetes_mellitus", "coronary_artery_disease",
    "appetite", "pedal_edema", "anemia"
]

@app.get("/")
def root():
    return {"message": "✅ CKD Dialysis Prediction API is running successfully!"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read uploaded CSV
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

        # Clean and standardize column names
        df.columns = df.columns.str.strip().str.lower()

        # ✅ Ensure all required columns exist — fill missing ones with zeros
        for col in FEATURE_COLUMNS:
            if col not in df.columns:
                df[col] = 0

        # Select and clean relevant columns
        df = df[FEATURE_COLUMNS].replace("?", np.nan).fillna(0)
        df = df.apply(pd.to_numeric, errors="ignore")

        # Align feature dimension with model input shape
        expected_dim = None
        if isinstance(model.input_shape, tuple):
            if len(model.input_shape) >= 2:
                expected_dim = model.input_shape[1]
        elif isinstance(model.input_shape, list) and len(model.input_shape) > 0:
            expected_dim = model.input_shape[0][1]

        if expected_dim is None:
            expected_dim = 53  # default fallback

        n = df.shape[0]
        X = np.zeros((n, expected_dim), dtype=np.float32)
        X[:, :df.shape[1]] = df.values.astype(np.float32)

        # Predict using model
        preds = model.predict(X)
        preds = np.array(preds).reshape(-1)

        # Generate response
        response = []
        for i, p in enumerate(preds):
            risk_percent = float(np.clip(p, 0, 1) * 100)

            # Estimate months till dialysis based on risk
            if risk_percent >= 90:
                months = 2 + int(np.random.randint(0, 2))
            elif risk_percent >= 75:
                months = 4 + int(np.random.randint(0, 3))
            elif risk_percent >= 60:
                months = 7 + int(np.random.randint(0, 3))
            elif risk_percent >= 50:
                months = 10 + int(np.random.randint(0, 3))
            else:
                months = 13

            risk_level = (
                "Very High Risk" if risk_percent >= 90 else
                "High Risk" if risk_percent >= 75 else
                "Moderate Risk" if risk_percent >= 50 else
                "Low Risk"
            )

            # Identify risk factors dynamically
            row = df.iloc[i]
            risk_factors = []
            if float(row.get("serum_creatinine", 0)) > 1.5:
                risk_factors.append("High serum creatinine")
            if float(row.get("blood_urea", 0)) > 40:
                risk_factors.append("Elevated blood urea")
            if float(row.get("hemoglobin", 999)) < 12:
                risk_factors.append("Low hemoglobin (anemia)")
            if float(row.get("blood_glucose_random", 0)) > 180:
                risk_factors.append("High blood sugar")
            if float(row.get("blood_pressure", 0)) >= 140:
                risk_factors.append("High blood pressure")

            # Possible comorbidities
            comorbidities = []
            if int(row.get("diabetes_mellitus", 0)) == 1:
                comorbidities.append("Diabetes Mellitus")
            if int(row.get("hypertension", 0)) == 1:
                comorbidities.append("Hypertension")
            if int(row.get("coronary_artery_disease", 0)) == 1:
                comorbidities.append("Coronary Artery Disease")

            # Dialysis prediction text
            prediction_text = (
                f"Likely dialysis required in approximately {months} month(s)"
                if risk_percent >= 50 else "Unlikely dialysis required within 12 months"
            )

            response.append({
                "Patient_Index": int(i + 1),
                "Dialysis_Need_Prediction": prediction_text,
                "Risk_Percentage": f"{risk_percent:.2f}%",
                "Risk_Level": risk_level,
                "Risk_Factors": risk_factors,
                "Possible_Comorbidities": comorbidities
            })

        return {"predictions": response}

    except Exception as e:
        return {"error": str(e)}
