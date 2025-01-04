// p5.js setup function (for initialization)
function setup() {
  console.log("p5.js is working!");
}

// Open a custom popup window with specified content
function win(content) {
  closePopup(); // Close any existing popups before opening a new one

  // Create a new div element for the popup
  let element = document.createElement("div");
  element.setAttribute("id", "mywindow"); // Set ID for the popup element
  element.setAttribute("onClick", "closePopup()"); // Close the popup when clicked
  element.innerHTML = content; // Insert the content into the popup
  document.body.appendChild(element); // Add the popup to the document body
}

// Close any open popup window by removing it from the DOM
function closePopup() {
  let window = document.getElementById("mywindow");
  if (window != null) {
    window.remove(); // Remove the popup if it exists
  }
}

// Handle opening a specific popup for a song
function openPopup(songName) {
  const popup = document.getElementById('popupCanvas');
  const popupContent = document.getElementById('popupContent');

  if (popup && popupContent) {
    popup.style.display = 'flex'; // Show the popup
    popupContent.textContent = `Now Playing: ${songName}`; // Display the song name in the popup
  } else {
    console.error("Popup elements are missing."); // Error handling if popup elements are not found
  }
}

// Handle closing the popup manually
function closePopup() {
  const popup = document.getElementById('popupCanvas');
  if (popup) {
    popup.style.display = 'none'; // Hide the popup
  }
}

// Add event listeners to each '.hoverbox' to show song details in a popup
document.querySelectorAll('.hoverbox').forEach(function(hoverbox) {
  hoverbox.addEventListener('click', function() {
      // Example content to be shown in the popup (song name and optional description)
      let content = `<h3>${this.querySelector('h3').textContent}</h3><p>${this.querySelector('p') ? this.querySelector('p').textContent : ''}</p>`;
      win(content); // Open the popup with the content
  });
});

// Play a song by name (from the 'songs' object)
function playSong(songName) {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume(); // Ensure audio context is active before playing sound
  }
  if (currentSong && currentSong.isPlaying()) {
    currentSong.stop(); // Stop the currently playing song (if any)
  }
  currentSong = songs[songName]; // Set the current song to the selected one
  currentSong.play(); // Play the selected song
}

// Change the playback speed of the current song
function changeSpeed(amount) {
  if (currentSong) {
    let newRate = currentSong.rate() + amount; // Adjust the speed
    newRate = constrain(newRate, 0.5, 2.0); // Ensure the speed stays within the range 0.5 - 2.0
    currentSong.rate(newRate); // Set the new playback speed
  }
}
