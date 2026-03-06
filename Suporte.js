function atualizarStatus(){

const hora = new Date().getHours()

const statusDot = document.getElementById("status-dot")
const statusText = document.getElementById("status-text")

if(hora >= 8 && hora < 23){

statusDot.className = "open"
statusText.innerText = "Suporte Online"

}else{

statusDot.className = "closed"
statusText.innerText = "Suporte Offline"

}

}

function atualizarRelogio(){

const agora = new Date()

let h = agora.getHours().toString().padStart(2,'0')
let m = agora.getMinutes().toString().padStart(2,'0')
let s = agora.getSeconds().toString().padStart(2,'0')

document.getElementById("countdown").innerText = `${h}:${m}:${s}`

}

setInterval(atualizarRelogio,1000)

atualizarStatus()
