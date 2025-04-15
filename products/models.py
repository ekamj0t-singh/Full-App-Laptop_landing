from django.db import models
from django.utils.text import slugify
import uuid

class Category(models.Model):
    """Product category model."""
    
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True, related_name='children')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Brand(models.Model):
    """Laptop brand model."""
    
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    logo = models.ImageField(upload_to='brands/', blank=True, null=True)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(models.Model):
    """Product model for laptops."""
    
    AVAILABILITY_CHOICES = [
        ('in_stock', 'In Stock'),
        ('out_of_stock', 'Out of Stock'),
        ('coming_soon', 'Coming Soon'),
        ('discontinued', 'Discontinued'),
    ]
    
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    sku = models.CharField(max_length=50, unique=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='products')
    categories = models.ManyToManyField(Category, related_name='products')
    description = models.TextField()
    short_description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    is_on_sale = models.BooleanField(default=False)
    stock_quantity = models.PositiveIntegerField(default=0)
    availability = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, default='in_stock')
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Laptop specific fields
    processor = models.CharField(max_length=100, blank=True)
    ram = models.CharField(max_length=50, blank=True)
    storage = models.CharField(max_length=100, blank=True)
    display = models.CharField(max_length=100, blank=True)
    graphics = models.CharField(max_length=100, blank=True)
    operating_system = models.CharField(max_length=50, blank=True)
    weight = models.CharField(max_length=50, blank=True)
    dimensions = models.CharField(max_length=100, blank=True)
    battery_life = models.CharField(max_length=50, blank=True)
    warranty = models.CharField(max_length=100, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        if not self.sku:
            self.sku = f"LP-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)
    
    @property
    def current_price(self):
        """Return the current price (sale price if on sale, otherwise regular price)."""
        if self.is_on_sale and self.sale_price is not None:
            return self.sale_price
        return self.price
    
    @property
    def discount_percentage(self):
        """Calculate discount percentage if the product is on sale."""
        if self.is_on_sale and self.sale_price is not None and self.price > 0:
            return int(((self.price - self.sale_price) / self.price) * 100)
        return 0
    
    @property
    def is_in_stock(self):
        """Check if the product is in stock."""
        return self.stock_quantity > 0 and self.availability == 'in_stock'


class ProductImage(models.Model):
    """Product image model."""
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=255, blank=True)
    is_primary = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"Image for {self.product.name}"
    
    def save(self, *args, **kwargs):
        # If this image is set as primary, unset any other primary images
        if self.is_primary:
            ProductImage.objects.filter(product=self.product, is_primary=True).update(is_primary=False)
        super().save(*args, **kwargs)


class ProductVideo(models.Model):
    """Product video model."""
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='videos')
    title = models.CharField(max_length=255)
    video_url = models.URLField()
    thumbnail = models.ImageField(upload_to='product_videos/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.title} for {self.product.name}"


class ProductFeature(models.Model):
    """Product feature model."""
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='features')
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.title} for {self.product.name}"


class ProductColor(models.Model):
    """Product color model."""
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='colors')
    name = models.CharField(max_length=50)
    color_code = models.CharField(max_length=10)
    image = models.ImageField(upload_to='product_colors/', blank=True, null=True)
    price_adjustment = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_available = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.name} for {self.product.name}"


class Cart(models.Model):
    """Shopping cart model."""
    
    user = models.OneToOneField('users.User', on_delete=models.CASCADE, related_name='cart', null=True, blank=True)
    session_id = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(user__isnull=False) | models.Q(session_id__isnull=False),
                name='cart_user_or_session_id'
            )
        ]
    
    def __str__(self):
        if self.user:
            return f"Cart for {self.user.email}"
        return f"Cart for session {self.session_id}"
    
    @property
    def total_items(self):
        """Get the total number of items in the cart."""
        return sum(item.quantity for item in self.items.all())
    
    @property
    def subtotal(self):
        """Calculate the subtotal of all items in the cart."""
        return sum(item.line_total for item in self.items.all())


class CartItem(models.Model):
    """Shopping cart item model."""
    
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    color = models.ForeignKey(ProductColor, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('cart', 'product', 'color')
    
    def __str__(self):
        return f"{self.quantity} x {self.product.name} in cart"
    
    @property
    def unit_price(self):
        """Get the unit price of the product, including any color price adjustment."""
        price = self.product.current_price
        if self.color and self.color.price_adjustment:
            price += self.color.price_adjustment
        return price
    
    @property
    def line_total(self):
        """Calculate the total price for this line item."""
        return self.unit_price * self.quantity
