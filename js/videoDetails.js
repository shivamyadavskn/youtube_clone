let data = JSON.parse(localStorage.getItem("video"));

function playVideo(data) {
    let container = document.getElementById("play");
    let iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=1`;
    iframe.height = "100%";
    iframe.width = "100%";
    iframe.setAttribute = ("allowfullscreen", true);
    container.appendChild(iframe);
}
playVideo(data);