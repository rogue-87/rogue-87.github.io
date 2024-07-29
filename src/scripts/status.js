import idle from "../assets/images/no-song-playing.png";

const userId = "369982847496355841";
const socket = new WebSocket("wss://api.lanyard.rest/socket");

socket.onopen = () => {
  // console.log("WebSocket connection opened");
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
  // console.error("WebSocket error:", error);
};

socket.onclose = (event) => {
  // console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
};

function handleInitialState(data) {
  const presence = data.d[userId];
  if (presence) {
    updateStatus(presence);
    updateCurrentSong(presence);
    marqueeText("songContainer", "song");
    marqueeText("artistContainer", "artist");
  }
}

function handlePresenceUpdate(data) {
  const presence = data.d;
  if (presence) {
    updateStatus(presence);
    updateCurrentSong(presence);
    marqueeText("songContainer", "song");
    marqueeText("artistContainer", "artist");
  }
}

function updateStatus(presence) {
  let status = presence.discord_status;
  if (status === "online" || status === "idle" || status === "dnd") {
    document.getElementById("status").innerHTML = `
      <span>online</span>
      <i class="fa-solid fa-circle" style="color: #23a55a;"></i>
    `;
  } else {
    document.getElementById("status").innerHTML = `
      <span>offline</span>
      <i class="fa-solid fa-circle" style="color: gray;"></i>
    `;
  }
}

function updateCurrentSong(presence) {
  if (!presence.listening_to_spotify) {
    document.getElementById("song").innerText = "...";
    document.getElementById("artist").innerText = "...";
    document.getElementById("songLink").setAttribute("href", "#");
    document.getElementById("songAlbum").style.backgroundImage =
      `url(${idle.src})`;
  } else {
    let spotify = presence.spotify;
    document.getElementById("song").innerText = spotify.song;
    document.getElementById("artist").innerText = spotify.artist.replaceAll(
      ";",
      ",",
    );
    document
      .getElementById("songLink")
      .setAttribute(
        "href",
        `https://open.spotify.com/track/${spotify.track_id}`,
      );
    document.getElementById("songAlbum").style.backgroundImage =
      `url(${spotify.album_art_url})`;
  }
}

function marqueeText(containerElementId, elementId) {
  const container = document.getElementById(containerElementId);
  const element = document.getElementById(elementId);

  if (element.innerText.includes("...")) {
    container.classList.remove("marquee");
  } else {
    container.classList.add("marquee");
  }
}
