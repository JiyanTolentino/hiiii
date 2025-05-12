const lyrics = [
    { text: "................", time: 0, duration: 17.3 },

    { text: "You were in college working part time waitin' tables", time: 17.3, duration: 4.2 },
    { text: "Left a small town, never looked back", time: 21.5, duration: 3.3 },
    { text: "I was a flight risk with a fear of falling", time: 24.8, duration: 4.0 },
    { text: "Wonderin' why we bother with love if it never lasts", time: 28.8, duration: 5.0 },

    { text: "I say, 'Can you believe it?'", time: 33.8, duration: 3.0 },
    { text: "As we're lyin' on the couch", time: 36.8, duration: 2.8 },
    { text: "The moment I could see it", time: 39.6, duration: 2.7 },
    { text: "Yes, yes, I can see it now", time: 42.3, duration: 3.0 },

    { text: "Do you remember, we were sittin' there by the water?", time: 45.3, duration: 5.2 },
    { text: "You put your arm around me for the first time", time: 50.5, duration: 4.5 },
    { text: "You made a rebel of a careless man's careful daughter", time: 55.0, duration: 5.0 },
    { text: "You are the best thing that's ever been mine", time: 60.0, duration: 6.0 }
];

let lyricTimeout;
let currentLyricIndex = 0;
let songStarted = false;
let animationFrame;

document.addEventListener('DOMContentLoaded', function() {
    const song = document.getElementById('song');
    const lyricsLine = document.getElementById('lyrics-line');
    const playButton = document.getElementById('play-button');
    
    async function fadeElement(element, direction, duration = 500) {
        return new Promise(resolve => {
            let start = null;
            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = (timestamp - start) / duration;
                element.style.opacity = direction === 'in' 
                    ? Math.min(progress, 1) 
                    : Math.max(1 - progress, 0);
                
                if (progress < 1) {
                    animationFrame = requestAnimationFrame(step);
                } else {
                    resolve();
                }
            };
            animationFrame = requestAnimationFrame(step);
        });
    }

    async function showLyric(index) {
        if (index >= lyrics.length) return;
        
        const lyric = lyrics[index];
        

        if (lyricsLine.style.opacity > 0) {
            await fadeElement(lyricsLine, 'out', 300);
        }
        
        lyricsLine.textContent = lyric.text;
        lyricsLine.className = lyric.text.includes("♪") ? "instrumental" : "";
        await fadeElement(lyricsLine, 'in', 400);
        
        lyricTimeout = setTimeout(() => {
            showLyric(index + 1);
        }, (lyric.duration * 1000) - 700);
    }

    function startExperience() {
        if (songStarted) return;
        songStarted = true;
        
        clearTimeout(lyricTimeout);
        cancelAnimationFrame(animationFrame);
        lyricsLine.style.opacity = 0;
        
        song.currentTime = 0;
        song.play().then(() => {
            playButton.style.display = 'none';
            currentLyricIndex = 0;
            
            showLyric(0);
            
            setTimeout(() => {
                cancelAnimationFrame(animationFrame);
                clearTimeout(lyricTimeout);
                song.pause();
                lyricsLine.textContent = "Blehhhh";
                lyricsLine.style.opacity = 1;
            }, 69000); 
        }).catch(error => {
            console.error("Playback failed:", error);
            lyricsLine.textContent = "Klikkk mo";
            songStarted = false;
        });
    }
    
    playButton.addEventListener('click', startExperience);
    document.addEventListener('click', function() {
        if (!songStarted && playButton.style.display !== 'none') {
            startExperience();
        }
    });
    song.addEventListener('ended', () => songStarted = false);
});
