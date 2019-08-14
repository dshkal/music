import './style/template.sass'
import 'tingle.js/dist/tingle.min.css'
import tingle from 'tingle.js'

function scrollTo (element) {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop
  })
}

function navigationClickHandler (event) {
  if (event.target.nodeName !== 'A' && !event.target.classList.contains('social-link')) return false
  event.preventDefault()
  const section = document.querySelector(event.target.getAttribute('href'))
  scrollTo(section)
}

function anchorClick (event) {
  event.preventDefault()
  const section = document.querySelector(document.querySelector('.work-link').getAttribute('href'))
  scrollTo(section)
}

function togglerClickHandler (event) {
  const navigation = document.querySelector('.navigation .__row')
  const toggler = document.querySelector('.toggler')
  navigation.classList.contains('open') ? navigation.classList.remove('open') : navigation.classList.add('open')
  toggler.classList.contains('expanded') ? toggler.classList.remove('expanded') : toggler.classList.add('expanded')
}

function addHoberEffect (container) {
  // Init
  const inner = container.querySelector('.portfolio-item-image')
  let mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(event) {
      var e = event || window.event;
      this.x = e.clientX - this._x;
      this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function(e) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function() {
      return "(" + this.x + ", " + this.y + ")"
    }
  }
  mouse.setOrigin(container)
  let counter = 0;
  let refreshRate = 10;
  let isTimeToUpdate = function() {
    return counter++ % refreshRate === 0
  }
  let onMouseEnterHandler = function(event) {
    update(event)
  }
  let onMouseLeaveHandler = function() {
    inner.style = ''
  }
  let onMouseMoveHandler = function(event) {
    if (isTimeToUpdate()) {
      update(event)
    }
  }
  let update = function(event) {
    mouse.updatePosition(event)
    updateTransformStyle(
      (mouse.y / inner.offsetHeight / 2).toFixed(2),
      (mouse.x / inner.offsetWidth / 2).toFixed(2)
    )
  }
  let updateTransformStyle = function (x, y) {
    let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)"
    inner.style.transform = style
    inner.style.webkitTransform = style
    inner.style.mozTranform = style
    inner.style.msTransform = style
    inner.style.oTransform = style
  }
  container.onmousemove = onMouseMoveHandler
  container.onmouseleave = onMouseLeaveHandler
  container.onmouseenter = onMouseEnterHandler
}

function onDomContentLoadedHandler () {
  const toggler = document.querySelector('.toggler')
  const navigation = document.querySelector('.navigation')
  const anchor = document.querySelector('.work-link')
  toggler.addEventListener('click', togglerClickHandler, false)
  navigation.addEventListener('click', navigationClickHandler, false)
  navigation.addEventListener('click', navigationClickHandler, false)
  anchor.addEventListener('click', anchorClick, false)
  const modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function() {
      console.log('modal open');
    },
    onClose: function() {
      console.log('modal closed');
    },
    beforeClose: function() {
      // here's goes some logic
      // e.g. save content before closing the modal
      return true; // close the modal
      return false; // nothing happens
    }
  });
  modal.setContent(`
    <form class="form modal-form" action='./mail.php' method="post">
      <div class="__row">
        <div class="__col-12 mb-20">
          <p class="text">Оставьте свой номер/почту <br class="hidden-xs"> и мы с вами свяжемся</p>
        </div>
        <div class="__col-12 mb-20">
          <input class="input" required placeholder="Номер / Почта" name="source">
        </div>
        <div class="__col-12">
          <button class="btn" type="submit">Оставить</button>
        </div>
      </div>
    </form>
  `);
  if (window.location.href.includes('success')) {
    window.history.replaceState({}, document.title, "/" + "?success=true");
  } else {
    setTimeout(() => {
      modal.open()
    }, 15000)
  }
}

document.addEventListener('DOMContentLoaded', onDomContentLoadedHandler, false)
