import { useParams } from 'react-router-dom'

export default function ProviderDetail() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-600">Provider Detail</h1>
        <p className="text-gray-500 mt-2">Provider ID: {id} — placeholder</p>
      </div>
    </div>
  )
}
