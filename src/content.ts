
document.addEventListener("mousedown", () => {
  removeInspector()
})

document.addEventListener("mouseup", async (e) => {
  const selected = window.getSelection()
  if (selected == null) return

  const text = selected.toString()
  if (text.length === 0 || text.length >= 1000) {
    removeInspector()
    return
  }


  const res = await fetch("https://translation.googleapis.com/language/translate/v2?key=" + import.meta.env.VITE_TRANSLATE_API_KEY, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(

      {
        q: text,
        source: "en",
        target: "ja",
        format: "text"
      })
  })

  const resbody = await res.json()
  const translated = resbody.data.translations[0]["translatedText"];
  console.log(resbody);

  const x = e.clientX + "px"
  const y = e.clientY + "px"
  createInspector(x, y, translated)
})


const inspectorContainerId = 'lexi-inspector'
function removeInspector() {
  document.querySelector(inspectorContainerId)
  const prevContainer = document.querySelector(`#${inspectorContainerId}`)
  if (prevContainer) {
    prevContainer.remove()
  }
}
function createInspector(left: string, top: string, text: string) {
  removeInspector()

  const container = document.createElement("div")
  container.id = inspectorContainerId
  container.style.left = left
  container.style.top = top
  container.innerHTML = `<span class="selected-text">${text}</span>`
  container.addEventListener("mouseup", (e) => {
    e.stopPropagation()
  })
  container.addEventListener("mousedown", (e) => {
    e.stopPropagation()
  })

  document.body.append(container)
}

