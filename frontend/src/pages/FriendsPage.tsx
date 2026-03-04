import { useState } from 'react';

type Friend = {
  id: string;
  username: string;
  currentBar: string | null;
};

const MOCK_FRIENDS: Friend[] = [
  { id: '1', username: 'john', currentBar: 'Roar' },
  { id: '2', username: 'emma', currentBar: null },
  { id: '3', username: 'jake', currentBar: 'Study Hall' },
  { id: '4', username: 'sarah', currentBar: 'Backstreets' },
  { id: '5', username: 'mike', currentBar: 'Nick\'s Tavern' },
];

type Tab = 'friends' | 'search' | 'requests';

export function FriendsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [groupByBar, setGroupByBar] = useState(false);

  const friends = MOCK_FRIENDS;
  const groupedByBar = groupByBar
    ? friends.reduce<Record<string, Friend[]>>((acc, f) => {
        const key = f.currentBar ?? 'Not at a bar';
        if (!acc[key]) acc[key] = [];
        acc[key].push(f);
        return acc;
      }, {})
    : null;

  const FriendRow = ({ friend }: { friend: Friend }) => (
    <div
      key={friend.id}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: '#262626',
        borderRadius: 12,
        marginBottom: 8,
      }}
    >
      <div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{friend.username}</div>
        <div style={{ fontSize: 13, color: '#a3a3a3' }}>
          {friend.currentBar ?? 'Not at a bar'}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          aria-label={`Message ${friend.username}`}
          style={{
            padding: '8px 14px',
            backgroundColor: '#333',
            color: '#e5e5e5',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Message
        </button>
        <button
          aria-label={`Nudge ${friend.username}`}
          style={{
            padding: '8px 14px',
            backgroundColor: '#f97316',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Nudge
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Friends</h1>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Friends sections"
        style={{
          display: 'flex',
          gap: 4,
          marginBottom: 20,
          backgroundColor: '#262626',
          borderRadius: 10,
          padding: 4,
        }}
      >
        {(['friends', 'search', 'requests'] as const).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab}-panel`}
            id={`${tab}-tab`}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: 8,
              backgroundColor: activeTab === tab ? '#f97316' : 'transparent',
              color: activeTab === tab ? '#fff' : '#a3a3a3',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'friends' && (
        <div role="tabpanel" id="friends-panel" aria-labelledby="friends-tab">
          <button
            onClick={() => setGroupByBar(!groupByBar)}
            style={{
              padding: '8px 14px',
              backgroundColor: groupByBar ? '#f97316' : '#333',
              color: '#e5e5e5',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              marginBottom: 16,
              cursor: 'pointer',
            }}
          >
            Group by Bar
          </button>

          {friends.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: 48,
                color: '#737373',
                fontSize: 15,
              }}
            >
              No friends yet. Search for users to add friends!
            </div>
          ) : groupedByBar ? (
            Object.entries(groupedByBar).map(([bar, list]) => (
              <div key={bar} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: '#f97316',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 8,
                  }}
                >
                  {bar}
                </div>
                {list.map((f) => (
                  <FriendRow key={f.id} friend={f} />
                ))}
              </div>
            ))
          ) : (
            friends.map((f) => <FriendRow key={f.id} friend={f} />)
          )}
        </div>
      )}

      {activeTab === 'search' && (
        <div role="tabpanel" id="search-panel" aria-labelledby="search-tab">
          <input
            type="search"
            placeholder="Search users by username..."
            value={searchQuery}
            aria-label="Search users by username"
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              backgroundColor: '#262626',
              border: '1px solid #333',
              borderRadius: 10,
              color: '#e5e5e5',
              fontSize: 15,
              marginBottom: 16,
              boxSizing: 'border-box',
            }}
          />
          <div style={{ color: '#737373', fontSize: 14 }}>
            {searchQuery
              ? `Search results for "${searchQuery}" — mock: no results yet`
              : 'Type a username to search for users to add.'}
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div
          role="tabpanel"
          id="requests-panel"
          aria-labelledby="requests-tab"
          style={{
            textAlign: 'center',
            padding: 48,
            color: '#737373',
            fontSize: 15,
          }}
        >
          No pending requests.
        </div>
      )}
    </div>
  );
}
