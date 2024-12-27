from django.shortcuts import render

def homepage(request):
    return render(request, 'laptop_price_predictor/homepage.html')

