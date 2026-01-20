document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.close-btn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Store the submit button content and disable it
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const action = contactForm.getAttribute('action');

            fetch(action, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            })
            .then(() => {
                // Since we used no-cors, we can't check response.ok. 
                // We assume success if the network request completed.
                contactForm.reset();
                successModal.style.display = 'flex';
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('Something went wrong. Please try again later.');
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
            });
        });
    }

    // Close Modal Logic
    function closeModal() {
        successModal.style.display = 'none';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    // Close on outside click
    window.addEventListener('click', function(e) {
        if (e.target == successModal) {
            closeModal();
        }
    });
});
