export function ReadyScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-green-400 to-green-600 flex flex-col items-center justify-center z-50">
      <div className="animate-pulse text-8xl mb-6">✅</div>
      <h1 className="text-4xl font-bold text-white mb-3">You&apos;re Ready!</h1>
      <p className="text-lg text-green-100">Please proceed to the service area.</p>
    </div>
  )
}
