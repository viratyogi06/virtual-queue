export function playBuzzer(): void {
  const ctx = new AudioContext()

  const beepAt = (startTime: number) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 800
    gain.gain.value = 0.3
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime + startTime)
    osc.stop(ctx.currentTime + startTime + 0.15)
  }

  beepAt(0.0)
  beepAt(0.2)
  beepAt(0.4)
}
