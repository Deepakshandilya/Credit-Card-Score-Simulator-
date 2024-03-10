from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the model
with open('gradient_boosting_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_loan_application', methods=['POST'])
def submit_loan_application():
    # Extract form data
    form_data = request.form.to_dict()
    
    # Preprocess the data (if needed)
    # For example, convert form fields to numeric types
    
    # Make prediction using the model
    prediction = model.predict([list(form_data.values())])
    
    # Convert prediction to a regular Python data type
    prediction = prediction.tolist()  # Convert NumPy array to list
    
    # Return the prediction
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
