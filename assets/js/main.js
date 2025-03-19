// Danh sách màu (5 xanh, 1 đỏ)
const colors = ['blue', 'blue', 'blue', 'blue', 'blue', 'red'];

// Tạo một chuỗi màu ngẫu nhiên cho mỗi người chơi
let players = [
    { id: 1, sequence: generateSequence(), currentIndex: 0, isAlive: true, counter: 0 },
    { id: 2, sequence: generateSequence(), currentIndex: 0, isAlive: true, counter: 0 },
    { id: 3, sequence: generateSequence(), currentIndex: 0, isAlive: true, counter: 0 },
    { id: 4, sequence: generateSequence(), currentIndex: 0, isAlive: true, counter: 0 },
];

// Hàm tạo chuỗi màu ngẫu nhiên cho mỗi người chơi
function generateSequence() {
    let sequence = [...colors];
    for (let i = sequence.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
    return sequence;
}

let shakeTimeout;

// Add event listeners for mousedown and mouseup to shake the screen
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mousedown', () => {
shakeTimeout = setTimeout(() => {
        document.body.classList.add('shake');
}, 200); // Start shaking after 200ms
    });
    button.addEventListener('mouseup', () => {
clearTimeout(shakeTimeout);
        document.body.classList.remove('shake');
    });
    button.addEventListener('mouseleave', () => {
clearTimeout(shakeTimeout);
        document.body.classList.remove('shake');
    });
});

let isSpinning = false; // Global flag to indicate if a spin is in progress

// Hàm thay đổi màu của ô được nhấn
function spin(playerId) {
if (isSpinning) return; // If a spin is already in progress, do nothing
    isSpinning = true; // Set the flag to indicate a spin is in progress
    
    let player = players.find(p => p.id === playerId);
    if (!player || !player.isAlive) {
        isSpinning = false; // Reset the flag if the player is not alive
return; // Nếu người chơi đã thua, không làm gì
}

    // Cập nhật số lần ấn
    player.counter++;
    document.getElementById(`counter${playerId}`).textContent = `Số lần ấn: ${player.counter}`;

    let color = player.sequence[player.currentIndex];
    document.getElementById(`button${playerId}`).style.backgroundColor = color;

    if (color === 'red') {
            var gunshotSound = document.getElementById('gunshotSound'); // Ensure the ID matches
gunshotSound.volume = 1.0; // Set volume to maximum
        gunshotSound.play();

        // Disable the button immediately
        document.getElementById(`button${playerId}`).classList.add('disabled');
        player.isAlive = false;

        // Add blood splatter effect
        const bloodSplatter = document.createElement('div');
        bloodSplatter.classList.add('blood-splatter');
        document.body.appendChild(bloodSplatter);

        setTimeout(() => {
            alert(`Người chơi ${playerId} đã thua!`);
isSpinning = false; // Reset the flag after the alert

            // Check if only one player is left alive
            let alivePlayers = players.filter(p => p.isAlive);
            if (alivePlayers.length === 1) {
                var winSound = document.getElementById('win');
                winSound.volume = 1.0; // Set volume to maximum
                winSound.play();

                setTimeout(() => {
                alert(`Người chơi ${alivePlayers[0].id} đã chiến thắng!`);
setTimeout(() => {
                        location.reload(); // Refresh the page after 5 seconds
                    }, 4000);
}, 500); // Delay to ensure the sound plays first
            }
}, 1000); // Delay to ensure the sound plays first

        // Remove blood splatter effect after 2 seconds
        setTimeout(() => {
            bloodSplatter.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(bloodSplatter);
            }, 2000); // Duration of fade-out effect
        }, 2000); // Delay before fade-out starts
} else {
var dryFireSound = document.getElementById('dryFire');
dryFireSound.volume = 1.0; // Set volume to maximum
dryFireSound.play();

        setTimeout(() => {
            isSpinning = false; // Reset the flag after the sound plays
        }, 1000); // Delay to ensure the sound plays first
    }

player.currentIndex++;
if (player.currentIndex >= player.sequence.length) {
player.currentIndex = 0; // Reset nếu hết chuỗi
    }
}