const players = document.querySelectorAll(".msc-trecho")

players.forEach(player => {
  const audio = player.querySelector("audio")
  const playBtn = player.querySelector(".play-btn")
  const progress = player.querySelector(".progress")
  const progressContainer = player.querySelector(".player-progress")
  const currentEl = player.querySelector(".current-time")
  const durationEl = player.querySelector(".duration")

  // Play/Pause
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      pauseAllOthers(audio) // 🔥 pausa os outros
      audio.play()
      playBtn.classList.replace("ri-play-large-fill", "ri-pause-large-fill")
    } else {
      audio.pause()
      playBtn.classList.replace("ri-pause-large-fill", "ri-play-large-fill")
    }
  })

  // Atualiza duração
  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration)
  })

  // Atualiza progresso
  audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100
  progress.style.width = percent + "%"
  currentEl.textContent = formatTime(audio.currentTime)

  // Corrige barra no final
  if (audio.duration - audio.currentTime < 0.05) { // último 0.05s
    progress.style.width = "100%"
    currentEl.textContent = formatTime(audio.duration)
  }
})

  // Resetar ícone quando terminar
  audio.addEventListener('ended', () => {
  playBtn.classList.remove('ri-pause-large-fill');
  playBtn.classList.add('ri-play-large-fill');

  // remove a transição para completar imediatamente
  progress.style.transition = 'none';
  progress.style.width = '100%';
  currentEl.textContent = formatTime(audio.duration);

  // restaurar a transição para os próximos plays
  setTimeout(() => {
    progress.style.transition = 'width 0.3s ease-out';
  }, 50);
});

  // Clicar na barra
  progressContainer.addEventListener("click", e => {
    const width = progressContainer.clientWidth
    const clickX = e.offsetX
    audio.currentTime = (clickX / width) * audio.duration
  })
})

// 🔥 Função que pausa todos os outros players
function pauseAllOthers(currentAudio) {
  players.forEach(p => {
    const otherAudio = p.querySelector("audio")
    const otherBtn = p.querySelector(".play-btn")
    if (otherAudio !== currentAudio) {
      otherAudio.pause()
      otherBtn.classList.replace("ri-pause-large-fill", "ri-play-large-fill")
    }
  })
}

function formatTime(sec){
  const min = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${min}:${s < 10 ? "0" : ""}${s}`
}
