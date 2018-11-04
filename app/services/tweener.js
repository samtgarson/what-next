const TWEEN = require('@tweenjs/tween.js')

TWEEN.now = function () {
  return new Date().getTime()
}

class NativeTween {
  constructor (view, opts) {
    this.view = view
    this.tween = this.createTween(opts)
  }

  createTween ({ from, to, duration = 300, ease = TWEEN.Easing.Quadratic.InOut }) {
    const tween = new TWEEN.Tween(from).to(to, duration)
    tween.easing(ease)

    tween.onUpdate(this.update.bind(this))

    return tween
  }

  update (params) {
    Object.entries(params).forEach(([prop, val]) => {
      this.view[prop] = val
    })
  }

  run () {
    const animate = () => {
      setTimeout(animate, 1000 / 60)
      TWEEN.update()
    }

    this.tween.start()
    animate()
  }
}

NativeTween.easing = TWEEN.Easing

module.exports = NativeTween
