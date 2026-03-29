document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedback-form');
    const messageDiv = document.getElementById('feedback-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('fb-name').value;
        const rank = document.querySelector('input[name="fb-rank"]:checked').value;
        messageDiv.textContent = `Thank you for your feedback, ${name}! Rating: ${rank}/5`;
    });
});