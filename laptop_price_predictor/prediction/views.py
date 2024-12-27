from django.shortcuts import render

from .utils import predict_price 

def index(request):
    return render(request, 'prediction/index.html')



def predict(request):
    if request.method == 'POST':
        # Handling POST request
        laptop_data = {
        'laptop_brand': request.POST.get('laptop_brand_id'),
        'laptop_processor': request.POST.get('laptop_processor_id'),
        'laptop_ram': request.POST.get('laptop_ram_id'),
        'laptop_ssd': request.POST.get('laptop_ssd_id'),
        'laptop_hard_disk': request.POST.get('laptop_hard_disk_id'),
        'laptop_os': request.POST.get('laptop_os_id'),
        'laptop_graphics': request.POST.get('laptop_graphics_id'),
        'screen_size': request.POST.get('screen_size_id'),
        'laptop_resolution': request.POST.get('laptop_resolution_id'),
        'num_cores': request.POST.get('num_cores_id'),
        'num_threads': request.POST.get('num_threads_id'),
        'spec_score': request.POST.get('spec_score'),
        }

        # Predict price using the model function
        prediction_data = predict_price(laptop_data)
        return render(request, 'prediction/result.html', {'prediction':(int) (prediction_data)})
    else:
        return render(request, 'prediction/prediction.html')


