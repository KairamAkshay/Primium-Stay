// Main frontend JS file
document.addEventListener('DOMContentLoaded', () => {
    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transition = 'opacity 0.5s ease';
            setTimeout(() => alert.remove(), 500);
        }, 5000);
    });

    // Form confirmation
    const deleteForms = document.querySelectorAll('form[method="POST"]');
    deleteForms.forEach(form => {
        if(form.querySelector('.btn-danger')) {
            form.addEventListener('submit', (e) => {
                if(!confirm('Are you sure you want to perform this action?')) {
                    e.preventDefault();
                }
            });
        }
    });
});
