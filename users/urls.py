from django.urls import path
from .views import (
    RegisterView, UserProfileView, UpdateUserProfileView, ChangePasswordView,
    AddressListCreateView, AddressDetailView, WishlistView,
    AddToWishlistView, RemoveFromWishlistView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/me/', UserProfileView.as_view(), name='user-profile'),
    path('profile/update_me/', UpdateUserProfileView.as_view(), name='update-profile'),
    path('profile/change_password/', ChangePasswordView.as_view(), name='change-password'),
    path('addresses/', AddressListCreateView.as_view(), name='address-list'),
    path('addresses/<int:pk>/', AddressDetailView.as_view(), name='address-detail'),
    path('wishlist/', WishlistView.as_view(), name='wishlist'),
    path('wishlist/add_product/', AddToWishlistView.as_view(), name='add-to-wishlist'),
    path('wishlist/remove_product/', RemoveFromWishlistView.as_view(), name='remove-from-wishlist'),
]
