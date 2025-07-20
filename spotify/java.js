console.log("lets write nthe js");
// a fnt that is reading our directory and converting it in texty thenm reading it to geet all the <a> and putting them in a new created element  div then running a loop for getting the link that is in between the href and .mp3
// as we are not using the backends thats why we r doing this otherwise we will fetch these through APIs

async function getSongs() {
  let songs = [];
  let a = await fetch("http://127.0.0.1:3000/songs/");
  let response = await a.text();
  console.log(response);

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
  }

  return songs;
}

async function main() {
  //get th4e lsit of all songs
  let songs = await getSongs();
  console.log(songs);
 let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
 for (const song of songs) {

  songUL.innerHTML = song.UL.innerHTML + songs;

 }

  //play the 1st song
  // acc to chrome seq untill and unless thjer user font interact the song will not play [ or simply we have to h=make a button for play]
  var audio = new Audio(songs[0]);
  audio.play();

  audio.addEventListener("loadeddata", () => {
    console.log(audio.duration ,audio.currentSrc,audio.currentTime)
    // The duration variable now holds the duration (in seconds) of the audio clip
  });
}






main()

