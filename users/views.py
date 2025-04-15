from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Address, Wishlist, WishlistItem
from .serializers import (
    RegisterSerializer, UserSerializer, ProfileSerializer, AddressSerializer,
    ChangePasswordSerializer, WishlistSerializer, WishlistItemSerializer
)
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    """User registration view."""
    serializer_class = RegisterSerializer


class UserProfileView(generics.RetrieveAPIView):
    """Retrieve the authenticated user's profile."""
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile


class UpdateUserProfileView(generics.UpdateAPIView):
    """Update the authenticated user's profile."""
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile


class ChangePasswordView(APIView):
    """Change the authenticated user's password."""
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({"old_password": "Incorrect password."}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)


class AddressListCreateView(generics.ListCreateAPIView):
    """List and create addresses for the authenticated user."""
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a specific address."""
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)


class WishlistView(generics.RetrieveAPIView):
    """Retrieve the authenticated user's wishlist."""
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.wishlist


class AddToWishlistView(APIView):
    """Add a product to the authenticated user's wishlist."""
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = WishlistItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        wishlist = request.user.wishlist
        product = serializer.validated_data['product']
        WishlistItem.objects.create(wishlist=wishlist, product=product)
        return Response({"detail": "Product added to wishlist."}, status=status.HTTP_201_CREATED)


class RemoveFromWishlistView(APIView):
    """Remove a product from the authenticated user's wishlist."""
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        if not product_id:
            return Response({"detail": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        wishlist = request.user.wishlist
        try:
            item = WishlistItem.objects.get(wishlist=wishlist, product_id=product_id)
            item.delete()
            return Response({"detail": "Product removed from wishlist."}, status=status.HTTP_200_OK)
        except WishlistItem.DoesNotExist:
            return Response({"detail": "Product not found in wishlist."}, status=status.HTTP_404_NOT_FOUND)