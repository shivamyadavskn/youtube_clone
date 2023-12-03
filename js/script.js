let API = "AIzaSyBmy3iwwQA3IQh2Jf21Dn4ZH-cCmZKJ7gE";

async function mostPopular() {
  try {
    let res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2000&chart=mostPopular&regionCode=IN&key=${API}`);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    let data = await res.json();
    append(data.items);
  } catch (error) {
    console.error("Error fetching most popular videos:", error);
  }
}

function append(data) {
  let container = document.getElementById("container");
  container.innerHTML = ""; // Clear the container

  data.forEach(({ snippet, id: { videoId } }) => {
    let img = snippet.thumbnails.high.url;
    let title = snippet.title;
    let channelTitle = snippet.channelTitle;
    let div = document.createElement("div");
    let image = document.createElement("img");
    image.src = img;
    let detailsDiv = document.createElement("div"); // Create a container for details
    let name = document.createElement("p");
    name.innerText = title;
    name.style.color = "white";
    let Cname = document.createElement("p");
    Cname.innerText = channelTitle;
    Cname.style.color = "white";
    detailsDiv.appendChild(name);
    detailsDiv.appendChild(Cname);

    div.addEventListener("click", function () {
      let data = {
        snippet,
        videoId
      };
      localStorage.setItem("video", JSON.stringify(data));
      window.location.href = "videoDetails.html";
    });

    div.appendChild(image);
    div.appendChild(detailsDiv); // Append the details container to the main div
    container.appendChild(div);
  });
}

async function search() {
  let query = document.getElementById("query").value;
  try {
    let res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1000&q=${query}&key=${API}`);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    let data = await res.json();
    append(data.items);
  } catch (error) {
    console.error("Error searching videos:", error);
  }
}

// Function to trigger search on Enter key press
function searchOnEnter(event) {
  if (event.key === "Enter") {
    search();
  }
}

// Placeholder for voice search functionality
function voiceSearch() {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function (event) {
    const voiceQuery = event.results[0][0].transcript;
    document.getElementById("query").value = voiceQuery;
    search();
  };
}

mostPopular(); // Call the function to fetch and display most popular videos


let sidebarOpen = true; // Start with the sidebar closed by default
const sidebar = document.getElementById("sidebar");
const container = document.getElementById("container");

// Function to open or close the sidebar and adjust the container's grid-template-columns
function toggleSidebar() {
    sidebarOpen = !sidebarOpen;

    if (sidebarOpen) {
        sidebar.style.width = "17%";
        container.style.marginLeft = "18.5%";
        container.style.gridTemplateColumns = "repeat(3, 1fr)";
    } else {
        sidebar.style.width = "0";
        container.style.marginLeft = "0";
        container.style.gridTemplateColumns = "repeat(4, 1fr)";
    }

    // Adjust container's width to occupy the full screen when the sidebar is closed
    if (!sidebarOpen) {
        container.style.width = "100%";
    } else {
        container.style.width = "80%";
    }
}

// Call the toggleSidebar function when the page loads to set the default container grid-template-columns
toggleSidebar();
