import './style.css'
import { createIcons, Code2, Download, Copy, Check, Play, ExternalLink } from 'lucide'

createIcons({ icons: { Code2, Download, Copy, Check, Play, ExternalLink } })

const tabs = document.querySelectorAll('[data-tabs] .tab')
const panels = document.querySelectorAll('[data-tabs] .term-panel')

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      t.classList.remove('active')
      t.setAttribute('aria-selected', 'false')
    })
    tab.classList.add('active')
    tab.setAttribute('aria-selected', 'true')

    panels.forEach((p) => {
      p.hidden = p.dataset.panel !== tab.dataset.tab
    })
  })
})

const copyButtons = document.querySelectorAll('[data-copy]')
copyButtons.forEach((btn) => {
  btn.addEventListener('click', async () => {
    const target = btn.dataset.copyTarget
    const code = document.getElementById(`code-${target}`)
    if (!code) return
    try {
      await navigator.clipboard.writeText(code.innerText)
    } catch {
      const range = document.createRange()
      range.selectNodeContents(code)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
      document.execCommand('copy')
      sel.removeAllRanges()
    }
    btn.classList.add('copied')
    setTimeout(() => btn.classList.remove('copied'), 1600)
  })
})

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1 }
)

document
  .querySelectorAll('.project, .job, .stat, .window, .feature-list li')
  .forEach((el) => {
    el.classList.add('reveal')
    observer.observe(el)
  })