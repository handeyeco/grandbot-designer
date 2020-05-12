window.onload = function init() {
  const digitCount = 4
  let state = []

  // Per digit stringified state
  function combineDigitState(digit) {
    let rv = 'B'
    for (let bit of Object.values(digit)) {
      rv += bit
    }
    return rv
  }

  // Stringified state for all digits
  function updateText(state) {
    let text = '{\n'
    for (let digit of state) {
      text += `  ${combineDigitState(digit)},\n`
    }

    // Hack way to remove last comma
    text = text.slice(0, -2)
    text += '\n}'
    document.getElementById('output').innerText = text
  }

  // Duplicate SVG
  const digit = document.getElementById('digit')
  digit.removeAttribute('id')
  const container = document.getElementById('digits-container')
  for (let i = 0, clone; i < digitCount - 1; i++) {
    clone = digit.cloneNode(true)
    container.appendChild(clone)
  }

  // Add state / handlers for each digit
  const digits = document.getElementsByClassName('digit')
  for (let i = 0; i < digits.length; i++) {
    state[i] = {
      dp: 0,
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
    }

    digits[i].addEventListener('click', e => {
      let digit = i
      let segment = e.target.dataset.segment

      if (segment) {
        // Toggle binary state
        state[digit][segment] = 1 - state[digit][segment]
        e.target.classList.toggle('active')
        updateText(state)
      }
    })
  }

  updateText(state)
}