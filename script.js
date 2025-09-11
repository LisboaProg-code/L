document.querySelectorAll(".player").forEach(player => {
  const audio = player.querySelector("audio")
  const playBtn = player.querySelector(".play")
  const playIcon = playBtn.querySelector("i")
  const progress = player.querySelector(".progress")
  const progressContainer = player.querySelector(".progress-container")
  const currentEl = player.querySelector(".current")
  const durationEl = player.querySelector(".duration")

  let isPlaying = false

  // Play/Pause
  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause()
      playIcon.classList.replace("ri-pause-large-fill", "ri-play-large-fill")
    } else {
      audio.play()
      playIcon.classList.replace("ri-play-large-fill", "ri-pause-large-fill")
    }
  })

  audio.addEventListener("play", () => isPlaying = true)
  audio.addEventListener("pause", () => isPlaying = false)

  // Atualiza duração
  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration)
  })

  // Atualiza progresso
  audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100
    progress.style.width = percent + "%"
    currentEl.textContent = formatTime(audio.currentTime)
  })

  // Clicar na barra
  progressContainer.addEventListener("click", e => {
    const width = progressContainer.clientWidth
    const clickX = e.offsetX
    audio.currentTime = (clickX / width) * audio.duration
  })

  function formatTime(sec){
    const min = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${min}:${s < 10 ? "0" : ""}${s}`
  }
})