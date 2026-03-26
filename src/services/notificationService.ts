import { playBuzzer } from '@/utils/sound'

export function triggerNotification(onVisual: () => void): void {
  playBuzzer()
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200, 100, 200])
  }
  onVisual()
}
