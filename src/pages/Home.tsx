import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueueContext } from '@/context/QueueContext';
import { Input } from '@/components/ui';
import { ProviderCard } from '@/components/ProviderCard';

type Tab = 'search' | 'scan';

export default function Home() {
  const { providers } = useQueueContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('search');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProviders = providers.filter(
    (p) =>
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white px-4 pt-12 pb-6">
        <h1 className="text-2xl font-bold">Virtual Queue</h1>
        <p className="text-sm text-blue-100 mt-1">Book your spot in seconds</p>
      </header>

      {/* Tab Bar */}
      <div className="bg-white border-b border-gray-200 flex">
        <button
          type="button"
          onClick={() => setActiveTab('search')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 min-h-[44px] text-sm font-medium transition-colors ${
            activeTab === 'search'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('scan')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 min-h-[44px] text-sm font-medium transition-colors ${
            activeTab === 'scan'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" />
          </svg>
          Scan QR
        </button>
      </div>

      {/* Content */}
      <main className="flex-1 px-4 py-4">
        {activeTab === 'search' ? (
          <>
            <Input
              placeholder="Search by name or specialty…"
              value={searchQuery}
              onChange={setSearchQuery}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              }
            />

            {filteredProviders.length > 0 ? (
              <div className="mt-4 space-y-3">
                {filteredProviders.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    onTap={(id) => navigate(`/provider/${id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-12 flex flex-col items-center text-center">
                <span className="text-5xl mb-3">🔍</span>
                <p className="text-lg font-semibold text-gray-700">No providers found</p>
                <p className="text-sm text-gray-500 mt-1">Try a different search term</p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-12 flex flex-col items-center text-center">
            <span className="text-5xl mb-3">📷</span>
            <p className="text-lg font-semibold text-gray-700">QR Scanning</p>
            <p className="text-sm text-gray-500 mt-1">Coming in a future update</p>
          </div>
        )}
      </main>
    </div>
  );
}
