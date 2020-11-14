

const boringVersion = document.getElementById('boring-version')

console.log(boringVersion.style.opacity)
window.setTimeout(() => {
  for(let i = 1; i < 11; i++) {
    window.setTimeout(() => {
      boringVersion.style.opacity= 1 - i / 10
    }, 100 * i)
}
}, 2000)


