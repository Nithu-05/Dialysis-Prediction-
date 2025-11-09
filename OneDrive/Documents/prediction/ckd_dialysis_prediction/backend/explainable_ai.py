import shap
import numpy as np

def explain_prediction(model, data):
    try:
        explainer = shap.Explainer(model, data)
        shap_values = explainer(data)
        important_features = np.mean(np.abs(shap_values.values), axis=0).tolist()
        return {"importance": important_features}
    except Exception as e:
        return {"error": str(e)}
