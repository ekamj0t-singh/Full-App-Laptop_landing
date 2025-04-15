from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Review(models.Model):
    """Product review model."""
    
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    title = models.CharField(max_length=255)
    content = models.TextField()
    is_verified_purchase = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    helpful_votes = models.PositiveIntegerField(default=0)
    unhelpful_votes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ('product', 'user')
    
    def __str__(self):
        return f"Review by {self.user.email} for {self.product.name}"


class ReviewImage(models.Model):
    """Review image model."""
    
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='review_images/')
    caption = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return f"Image for review #{self.review.id}"


class ReviewVideo(models.Model):
    """Review video model."""
    
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='videos')
    video_url = models.URLField()
    thumbnail = models.ImageField(upload_to='review_videos/', blank=True, null=True)
    caption = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return f"Video for review #{self.review.id}"


class ReviewVote(models.Model):
    """Model to track user votes on reviews."""
    
    VOTE_CHOICES = [
        ('helpful', 'Helpful'),
        ('unhelpful', 'Unhelpful'),
    ]
    
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='votes')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='review_votes')
    vote = models.CharField(max_length=10, choices=VOTE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('review', 'user')
    
    def __str__(self):
        return f"{self.user.email} voted {self.vote} on review #{self.review.id}"
