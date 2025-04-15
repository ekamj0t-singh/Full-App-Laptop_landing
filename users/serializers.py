from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import Profile, Address, Wishlist, WishlistItem

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone_number']
        read_only_fields = ['id', 'email']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'first_name', 'last_name', 'phone_number']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        
        # Create profile and wishlist for the user
        Profile.objects.create(user=user)
        Wishlist.objects.create(user=user)
        
        return user


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = ['user', 'avatar', 'bio', 'date_of_birth']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'id', 'address_type', 'full_name', 'address_line1', 'address_line2',
            'city', 'state', 'postal_code', 'country', 'phone_number', 'is_default'
        ]
        read_only_fields = ['id']


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password2 = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({"new_password": "Password fields didn't match."})
        return attrs


class WishlistItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset='products.Product.objects.all()')
    
    class Meta:
        model = WishlistItem
        fields = ['id', 'product', 'added_at']
        read_only_fields = ['id', 'added_at']


class WishlistSerializer(serializers.ModelSerializer):
    items = WishlistItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Wishlist
        fields = ['id', 'items', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
