document.getElementById('admissionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Application submitted successfully! Please proceed with the next steps in the admission process.');
    this.reset();
});