console.log("Welcome to Spotify");

// Initialize the Variables


let songIndex = 0;
let audioElement = new Audio('songs/Nazm.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Nazm-Nazm", filePath: "songs/1.mp3", coverPath:"covers/Nazm.png"},
    {songName: "Tu Banja Gali Banaras ki", filePath: "songs/2.mp3", coverPath: "covers/Tu.jpg"},
    {songName: "Ranjhana(Ranjhana)", filePath: "songs/3.mp3", coverPath: "covers/Ranjhana.jpg"},
    {songName: "Love me Like you do", filePath: "songs/4.mp3", coverPath: "covers/Love.jpeg"},
    {songName: "Kal ho na ho", filePath: "songs/5.mp3", coverPath: "covers/Kal ho.jpeg"},
    {songName: "Rabba mai to mar gaya- Mausam", filePath: "songs/2.mp3", coverPath: "covers/rabba.jpg"},
    {songName: "Deva Deva- Brahmastra", filePath: "songs/2.mp3", coverPath: "covers/Deva.jpg"},
    {songName: "Bhula Dena - Aashiqui-2", filePath: "songs/2.mp3", coverPath: "covers/Bhula dena.jpg"},
    {songName: "Mann Mera-Table no. 21", filePath: "songs/2.mp3", coverPath: "covers/mann mera.jpg"},
    {songName: "Pal-Jalebi", filePath: "songs/4.mp3", coverPath: "covers/Pal.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})