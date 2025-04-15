# TechLaptops E-commerce Backend

This is the Django backend for the TechLaptops e-commerce website. It provides a complete API for managing users, products, orders, reviews, and payments.

## Features

- User authentication and management
- Product catalog with categories, brands, and detailed specifications
- Shopping cart functionality
- Order management
- Review system with images and videos
- Payment processing with Razorpay
- Wishlist functionality

## Requirements

- Python 3.8+
- PostgreSQL (recommended for production)
- Razorpay account (for payment processing)

## Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/techlaptops-backend.git
cd techlaptops-backend
\`\`\`

2. Create a virtual environment and activate it:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Create a `.env` file based on `.env.example` and fill in your configuration.

5. Run migrations:
\`\`\`bash
python manage.py migrate
\`\`\`

6. Create a superuser:
\`\`\`bash
python manage.py createsuperuser
\`\`\`

7. Run the development server:
\`\`\`bash
python manage.py runserver
\`\`\`

## API Documentation

The API documentation is available at `/api/docs/` when the server is running.

## Deployment

This application is ready to be deployed to platforms like Heroku, AWS, or any other hosting service that supports Django applications.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
\`\`\`

```python file="users/views.py"
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .models import Profile, Address, Wishlist, WishlistItem
from .serializers import (
    UserSerializer, RegisterSerializer, ProfileSerializer, 
    AddressSerializer, ChangePasswordSerializer, WishlistSerializer
)
from products.models import Product

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return Profile.objects.get(user=self.request.user)


class UpdateUserProfileView(generics.UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return Profile.objects.get(user=self.request.user)
    
    def update(self, request, *args, **kwargs):
        profile = self.get_object()
        user = profile.user
        
        # Update user data
        user_serializer = UserSerializer(user, data=request.data.get('user', {}), partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Update profile data
        return super().update(request, *args, **kwargs)


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Check old password
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'old_password': ['Wrong password.']}, status=status.HTTP_400_BAD_REQUEST)
            
            # Set new password
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddressListCreateView(generics.ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)


class WishlistView(generics.RetrieveAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        wishlist, created = Wishlist.objects.get_or_create(user=self.request.user)
        return wishlist


class AddToWishlistView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        product_id = request.data.get('product_id')
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        wishlist, created = Wishlist.objects.get_or_create(user=request.user)
        
        # Check if product already in wishlist
        if WishlistItem.objects.filter(wishlist=wishlist, product=product).exists():
            return Response({'message': 'Product already in wishlist'}, status=status.HTTP_200_OK)
        
        # Add product to wishlist
        WishlistItem.objects.create(wishlist=wishlist, product=product)
        
        return Response({'message': 'Product added to wishlist'}, status=status.HTTP_201_CREATED)


class RemoveFromWishlistView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        product_id = request.data.get('product_id')
        
        try:
            wishlist = Wishlist.objects.get(user=request.user)
            wishlist_item = WishlistItem.objects.get(wishlist=wishlist, product_id=product_id)
            wishlist_item.delete()
            return Response({'message': 'Product removed from wishlist'}, status=status.HTTP_200_OK)
        except (Wishlist.DoesNotExist, WishlistItem.DoesNotExist):
            return Response({'error': 'Product not found in wishlist'}, status=status.HTTP_404_NOT_FOUND)
