function updateCounterDisplay(days) {
    const element = document.getElementById('days');
    const newValue = String(days);
    
    if (element.textContent !== newValue) {
        element.classList.add('updating');
        element.textContent = newValue;
        setTimeout(() => element.classList.remove('updating'), 300);
    }
}

function animateCounterFromZero(targetDays) {
    const element = document.getElementById('days');
    const duration = 4000; // 4 seconds
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easeOut animation for smoother effect
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeOut * targetDays);
        
        element.textContent = String(currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = String(targetDays);
        }
    }
    
    requestAnimationFrame(animate);
}

function startCountUp(startDate, endDate) {
    let hasAnimated = false;
    
    function updateCounter() {
        const now = new Date();
        const timeDiff = now - startDate;
        
        if (timeDiff >= 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            
            if (!hasAnimated) {
                animateCounterFromZero(days);
                hasAnimated = true;
            } else {
                updateCounterDisplay(days);
            }
            
            if (now >= endDate) {
                clearInterval(interval);
                return;
            }
        }
    }
    
    updateCounter();
    const interval = setInterval(updateCounter, 60000);
}

document.addEventListener('DOMContentLoaded', () => {
    const startDate = new Date("Jun 09, 2025 00:00");
    const endDate = new Date("Dec 31, 2025 23:59");
    startCountUp(startDate, endDate);
});
