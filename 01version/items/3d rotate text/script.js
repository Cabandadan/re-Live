
function n3xt(text, element) {
  let sample = document.querySelector(element)
  if(sample.dataset.animating === 'true') return
  let sampleH = 50 // will keep it fixed, otherwise sample.offsetHeight
  let sampleT = sample.textContent // old text
  let sampleNT = text // new text
  sample.dataset.animating = 'true'
  sample.style.height = sampleH + 'px'

  // original text element
  let samO = document.createElement('div')
  samO.style.transformOrigin = '0 ' + (sampleH/2) + 'px -' + (sampleH/2) + 'px'
  samO.classList.add('t3xt')
  samO.textContent = sampleT

  // new text element
  let samN = samO.cloneNode()
  samN.textContent = sampleNT
  sample.textContent = ''
  sample.appendChild(samO)
  sample.appendChild(samN)

  samO.classList.add('t3xt-out')
  samN.classList.add('t3xt-in')

  samN.addEventListener('animationend', function(event){
    sample.removeChild(samO)
    sample.removeChild(samN)
    sample.textContent = sampleNT
    sample.dataset.animating = 'false'
  })
}


let phraseIndex = 1
let wordIndex = 0
let t3xts = [
  ["Nof", "This is", "Me"],
  ["I can't", "see my", "forehead"],
  ["f", "an instrument?"],
  ["h stands", "hhhhh", "🎶"],
  ["I Never", "you Never", "Never"],
  ["It may be", "stupid, but", "it's also dumb"],
  ["Moss always", "points to", "civilization"]
]

// start it off
setTimeout(changetext, 200)

function changetext(){
  if(wordIndex > 2) {
    wordIndex = 0
    phraseIndex++
  }
  if(phraseIndex >= t3xts.length) {
    phraseIndex = 0
  }
  let term = t3xts[phraseIndex][wordIndex]
  n3xt(term, '.t3xt-' + (++wordIndex) )

  if(wordIndex == 3) {
    setTimeout(changetext, 2000)
  } else {
    setTimeout(changetext, 150)
  }
}
