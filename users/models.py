from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    """Custom user model that uses email instead of username."""
    
    username = None
    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()
    
    def __str__(self):
        return self.email


class Profile(models.Model):
    """Extended profile information for users."""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    bio = models.TextField(blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.user.email}'s profile"


class Address(models.Model):
    """User address model."""
    
    ADDRESS_TYPE_CHOICES = [
        ('billing', 'Billing'),
        ('shipping', 'Shipping'),
        ('both', 'Both'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    address_type = models.CharField(max_length=10, choices=ADDRESS_TYPE_CHOICES, default='both')
    full_name = models.CharField(max_length=100)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    is_default = models.BooleanField(default=False)
    
    class Meta:
        verbose_name_plural = 'Addresses'
    
    def __str__(self):
        return f"{self.full_name}, {self.city}, {self.country}"
    
    def save(self, *args, **kwargs):
        # If this address is set as default, unset any other default addresses of the same type
        if self.is_default:
            Address.objects.filter(
                user=self.user, 
                address_type__in=[self.address_type, 'both'],
                is_default=True
            ).update(is_default=False)
        super().save(*args, **kwargs)


class Wishlist(models.Model):
    """User wishlist model."""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wishlist')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.email}'s wishlist"


class WishlistItem(models.Model):
    """Items in a user's wishlist."""
    
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('wishlist', 'product')
    
    def __str__(self):
        return f"{self.product.name} in {self.wishlist.user.email}'s wishlist"
