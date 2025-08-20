import { useEffect, useState } from 'react'

export default function Legislators() {
  const [legislators, setLegislators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3000/legislators')
        if (!response.ok) throw new Error('Failed to fetch legislators')
        const data = await response.json()
        setLegislators(data)
      } catch (err) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p>Loading legislators…</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div style={{ padding: 16 }}>
      <h2>Legislators</h2>
      {legislators.length === 0 ? (
        <p>No legislators found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {legislators.map((l) => (
            <li key={l._id} style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 12,
              marginBottom: 8
            }}>
              <div style={{ fontWeight: 600 }}>
                {l.firstName} {l.lastName}
              </div>
              <div style={{ fontSize: 14, color: '#555' }}>
                {l.chamber} • {l.partyAffiliation} • {l.homeState}{typeof l.district === 'number' ? `-${l.district}` : ''}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


