const express = require('express');
const bodyParser = require('body-parser');
const { load } = require('joblib'); // Assuming you're using a library like joblib to load .pkl files

const app = express();
app.use(bodyParser.json());

// Load the model
const model = load('gradient_boosting_model.pkl'); // Adjust the path to your .pkl file

// Define routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit_loan_application', (req, res) => {
    // Extract form data
    const form_data = req.body;
    
    // Preprocess the data (if needed)
    // For example, convert form fields to numeric types
    
    // Make prediction using the model
    const prediction = model.predict([Object.values(form_data)]);
    
    // Convert prediction to a regular JavaScript data type
    const predictionValue = prediction[0];
    
    // Return the prediction
    res.json({ prediction: predictionValue });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
