function toggleLetter() {
              const letter = document.getElementById('letter');
              const btn = document.getElementById('toggleBtn');
              const flap = document.getElementById('flap');
              
              if (letter.classList.contains('visible')) {
                  letter.classList.remove('visible');
                  btn.textContent = 'Open';
                  flap.style.transform = 'rotateX(0deg)';
              } else {
                  letter.classList.add('visible');
                  btn.textContent = 'Close';
                  flap.style.transform = 'rotateX(-180deg)';

                  const confetti = document.createElement('div');
                  confetti.style.position = 'fixed';
                  confetti.style.width = '100%';
                  confetti.style.height = '100%';
                  confetti.style.top = '0';
                  confetti.style.left = '0';
                  confetti.style.zIndex = '9999';
                  confetti.style.pointerEvents = 'none';
                  document.body.appendChild(confetti);
  
                  for (let i = 0; i < 50; i++) {
                      setTimeout(() => {
                          const heart = document.createElement('div');
                          heart.innerHTML = '❤️';
                          heart.style.position = 'absolute';
                          heart.style.fontSize = `${Math.random() * 20 + 10}px`;
                          heart.style.left = `${Math.random() * 100}vw`;
                          heart.style.top = '-20px';
                          heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
                          confetti.appendChild(heart);
  
                          setTimeout(() => heart.remove(), 5000);
                      }, i * 100);
                  }
  
                  setTimeout(() => confetti.remove(), 5000);
              }
          }

function myFunction (){
  window.alert("Note that everything you see here is mmade by Jiyan, and if you see this message CONGRATS,what a lucky girl you are!");
}