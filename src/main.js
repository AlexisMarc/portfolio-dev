import './style.css'
import { createIcons, Code2, Download, Copy, Check, Play, ExternalLink, X, Info } from 'lucide'

createIcons({ icons: { Code2, Download, Copy, Check, Play, ExternalLink, X, Info } })

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

const finapModal = document.getElementById('finap-modal')

function openFinapModal() {
  finapModal.hidden = false
  document.body.classList.add('modal-open')
}

function closeFinapModal() {
  finapModal.hidden = true
  document.body.classList.remove('modal-open')
  if (window.location.hash === '#finap') {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }
}

function syncFinapModal() {
  if (window.location.hash === '#finap') {
    openFinapModal()
  } else if (!finapModal.hidden) {
    closeFinapModal()
  }
}

window.addEventListener('hashchange', syncFinapModal)
syncFinapModal()

finapModal.querySelectorAll('[data-close-modal]').forEach((el) => {
  el.addEventListener('click', () => {
    closeFinapModal()
  })
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !finapModal.hidden) {
    closeFinapModal()
  }
})

const credBtn = finapModal.querySelector('[data-copy-cred]')
if (credBtn) {
  credBtn.addEventListener('click', async () => {
    const user = document.getElementById('cred-user').innerText
    const pass = document.getElementById('cred-pass').innerText
    const text = `Usuario: ${user}\nContraseña: ${pass}`
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // fallback silencioso
    }
    credBtn.classList.add('copied')
    setTimeout(() => credBtn.classList.remove('copied'), 1600)
  })
}

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