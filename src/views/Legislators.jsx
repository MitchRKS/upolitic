import { useEffect, useState } from 'react'

export default function Legislators() {
  const [legislators, setLegislators] = useState([])
  const [states, setStates] = useState(['All'])
  const [selectedState, setSelectedState] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadStates() {
      try {
        const res = await fetch('http://localhost:3000/states')
        if (!res.ok) throw new Error('Failed to fetch states')
        const data = await res.json()
        setStates(['All', ...data])
      } catch (err) {
        setStates(['All'])
      }
    }
    loadStates()
  }, [])

  useEffect(() => {
    async function loadLegislators() {
      try {
        setLoading(true)
        const url = new URL('http://localhost:3000/legislators')
        if (selectedState && selectedState !== 'All') {
          url.searchParams.set('state', selectedState)
        }
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch legislators')
        const data = await response.json()
        setLegislators(data)
      } catch (err) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    loadLegislators()
  }, [selectedState])

  if (loading) return <p>Loading legislators…</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div style={{ padding: 16 }}>
      <h2>Legislators</h2>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="state-filter" style={{ marginRight: 8 }}>State:</label>
        <select
          id="state-filter"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
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
                {[l.homeState, l.chamber, (typeof l.district === 'number' ? `District ${l.district}` : null), l.partyAffiliation].filter(Boolean).join(' • ')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


