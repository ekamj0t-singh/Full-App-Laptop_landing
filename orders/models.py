from django.db import models
from django.utils.crypto import get_random_string
import uuid

class Coupon(models.Model):
    """Coupon model for discounts."""
    
    DISCOUNT_TYPE_CHOICES = [
        ('percentage', 'Percentage'),
        ('fixed', 'Fixed Amount'),
    ]
    
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField(blank=True)
    discount_type = models.CharField(max_length=10, choices=DISCOUNT_TYPE_CHOICES)
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)
    minimum_order_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    max_uses = models.PositiveIntegerField(default=0)  # 0 means unlimited
    current_uses = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.code
    
    @property
    def is_valid(self):
        """Check if the coupon is currently valid."""
        from django.utils import timezone
        now = timezone.now()
        
        if not self.is_active:
            return False
        
        if now < self.valid_from or now > self.valid_to:
            return False
        
        if self.max_uses > 0 and self.current_uses >= self.max_uses:
            return False
        
        return True


class Order(models.Model):
    """Order model."""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    ]
    
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
        ('partially_refunded', 'Partially Refunded'),
    ]
    
    user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, related_name='orders')
    order_number = models.CharField(max_length=20, unique=True, editable=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    
    # Shipping information
    shipping_address = models.F  default='pending')
    
    # Shipping information
    shipping_address = models.ForeignKey('users.Address', on_delete=models.SET_NULL, null=True, related_name='shipping_orders')
    billing_address = models.ForeignKey('users.Address', on_delete=models.SET_NULL, null=True, related_name='billing_orders')
    
    # Order details
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Coupon information
    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    coupon_code = models.CharField(max_length=20, blank=True)
    
    # Dates
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    shipped_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    cancelled_at = models.DateTimeField(null=True, blank=True)
    
    # Notes
    customer_notes = models.TextField(blank=True)
    admin_notes = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.order_number
    
    def save(self, *args, **kwargs):
        if not self.order_number:
            self.order_number = self._generate_order_number()
        super().save(*args, **kwargs)
    
    def _generate_order_number(self):
        """Generate a unique order number."""
        prefix = 'ORD'
        random_str = get_random_string(length=8, allowed_chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
        return f"{prefix}-{random_str}"
    
    @property
    def order_total(self):
        """Calculate the total order amount."""
        return self.subtotal + self.shipping_cost + self.tax - self.discount


class OrderItem(models.Model):
    """Order item model."""
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('products.Product', on_delete=models.SET_NULL, null=True)
    product_name = models.CharField(max_length=255)  # Store the name in case the product is deleted
    product_sku = models.CharField(max_length=50)
    color = models.CharField(max_length=50, blank=True)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    line_total = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.quantity} x {self.product_name} in order {self.order.order_number}"


class OrderStatusUpdate(models.Model):
    """Order status update history."""
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='status_updates')
    status = models.CharField(max_length=20, choices=Order.STATUS_CHOICES)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Status update for order {self.order.order_number}: {self.status}"


class Refund(models.Model):
    """Refund model."""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    ]
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='refunds')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    processed_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, related_name='processed_refunds')
    
    def __str__(self):
        return f"Refund for order {self.order.order_number}"
