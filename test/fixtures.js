let element

function setup() {
  element = document.createElement('div')
  element.style.height = '20000px'
  document.body.appendChild(element)
}

function teardown() {
  document.body.removeChild(element)
}

export default {
  setup,
  teardown
}
