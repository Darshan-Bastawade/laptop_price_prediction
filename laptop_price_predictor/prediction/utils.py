# utils.py
import joblib,os
import pandas as pd

def predict_price(laptop_data):
    # Load your trained model
    model_path = os.path.join(os.path.dirname(__file__), 'models', 'model.pkl')

    # Load the model
    with open(model_path, 'rb') as file:
        model = joblib.load(file)
    
    # Prepare the data as required by your model (this will depend on your model's input format)
    data = pd.DataFrame({
    'brand':  [laptop_data['laptop_brand']],
    'processor_name':[laptop_data['laptop_processor']],
    'ram(GB)':[laptop_data['laptop_ram']],
    'ssd(GB)': [laptop_data['laptop_ssd']],
    'Hard Disk(GB)':[laptop_data['laptop_hard_disk']],
    'Operating System': [laptop_data['laptop_os']],
    'graphics':  [laptop_data['laptop_graphics']],
    'screen_size(inches)': [laptop_data['screen_size']],
    'resolution (pixels)': [laptop_data['laptop_resolution']],
    'no_of_cores': [laptop_data['num_cores']],
    'no_of_threads': [laptop_data['num_threads']],
    'spec_score': [laptop_data['spec_score']]
    })

# Prepare the data as required by your model

    
    # Predict the price
    predicted_price = model.predict(data.values)
    return predicted_price[0]
