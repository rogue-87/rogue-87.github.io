import idle from "../assets/images/no-song-playing.png";

const userId = "369982847496355841";
const socket = new WebSocket("wss://api.lanyard.rest/socket");

socket.onopen = () => {
  console.log("WebSocket connection opened");
  socket.send(
    JSON.stringify({
      op: 2,
      d: {
        subscribe_to_ids: [userId],
      },
    }),
  );
  setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ op: 3 }));
    }
  }, 30000);
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.t === "INIT_STATE") {
    handleInitialState(data);
  } else if (data.t === "PRESENCE_UPDATE") {
    handlePresenceUpdate(data);
  }
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

socket.onclose = (event) => {
  console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
};

function handleInitialState(data) {
  const presence = data.d[userId];
  if (presence) {
    updateStatus(presence);
    updateCurrentSong(presence);
  }
}

function handlePresenceUpdate(data) {
  const presence = data.d;
  if (presence) {
    updateStatus(presence);
    updateCurrentSong(presence);
  }
}

function updateStatus(presence) {
  let status = presence.discord_status;
  if (status === "online" || status === "idle" || status === "dnd") {
    document.getElementById("status").innerHTML = `
      <span>Online</span>
      <i class="fa-solid fa-circle" style="color: #23a55a;"></i>
    `;
  } else {
    document.getElementById("status").innerHTML = `
      <span>Offline</span>
      <i class="fa-solid fa-circle" style="color: gray;"></i>
    `;
  }
}

function updateCurrentSong(presence) {
  if (!presence.listening_to_spotify) {
    document.getElementById("musicLog").innerHTML = `
      <div class="song-info">
        <div>
          <i class="fa-solid fa-music"></i>
          <div class="song">...</div>
        </div>
        <div>
          <i class="fa-solid fa-user"></i>
          <div class="artist">...</div>
        </div>
      </div>
      <div class="song-album">
        <img src="${idle.src}" alt="no-song" />
      </div>
    `;
  } else {
    let spotify = presence.spotify;
    document.getElementById("musicLog").innerHTML = `
      <div class="song-info">
        <div>
          <i class="fa-solid fa-music"></i>
          <div class="song">${spotify.song}</div>
        </div>
        <div>
          <i class="fa-solid fa-user"></i>
          <div class="artist">${spotify.artist}</div>
        </div>
      </div>
      <div class="song-album">
        <a href="https://open.spotify.com/track/${spotify.track_id}">
          <img src="${spotify.album_art_url}" alt="spotify album">
        </a>
      </div>
    `;
  }
}
