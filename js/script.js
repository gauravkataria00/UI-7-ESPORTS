document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Countdown Timer
  const targetDate = new Date('2025-08-20T20:00:00'); // Update to your next scrim date
  const updateCountdown = () => {
    const now = new Date();
    const difference = targetDate - now;
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      document.getElementById('days').textContent = days;
      document.getElementById('hours').textContent = hours;
      document.getElementById('minutes').textContent = minutes;
      document.getElementById('seconds').textContent = seconds;
    } else {
      document.getElementById('countdown').innerHTML = '<h2 class="text-2xl font-bold">Scrim Started!</h2>';
    }
  };
  setInterval(updateCountdown, 1000);
});