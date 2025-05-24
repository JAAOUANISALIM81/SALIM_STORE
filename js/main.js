// وظائف سلة التسوق
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة سلة التسوق
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // إضافة المنتج للسلة عند النقر على زر "أضف للسلة"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const priceElement = productCard.querySelector('.price');
            const productPrice = priceElement ? parseFloat(priceElement.textContent) : 0; // تعيين سعر افتراضي 0 إذا لم يتم العثور على السعر
            const productImage = productCard.querySelector('.product-image img').src;
            
            // إضافة المنتج للسلة أو زيادة الكمية إذا كان موجوداً
            const existingProduct = cart.find(item => item.title === productTitle);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({
                    title: productTitle,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            
            // حفظ السلة في التخزين المحلي وتحديث عدد المنتجات
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            // إظهار رسالة تأكيد
            showNotification(`تمت إضافة ${productTitle} إلى سلة التسوق`);
        });
    });

    // تحديث عدد المنتجات في السلة
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    // إظهار إشعار
    function showNotification(message) {
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // إضافة الإشعار للصفحة
        document.body.appendChild(notification);
        
        // إظهار الإشعار
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // إخفاء الإشعار بعد 3 ثوانٍ
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // إضافة أنماط CSS للإشعارات
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #0056b3;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
            z-index: 1000;
            font-family: 'Cairo', sans-serif;
        }
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// تبديل الشرائح في شريط الإعلانات
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length <= 1) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // تبديل الشرائح كل 5 ثوانٍ
    setInterval(nextSlide, 5000);
}

// تنفيذ وظائف الموقع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
});
