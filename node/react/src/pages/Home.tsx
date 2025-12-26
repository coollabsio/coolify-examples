import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// Build-time public var (baked into bundle)
const buildPublicVar = import.meta.env.VITE_BUILD_PUBLIC_VAR || 'default-value'

function Home() {
  useEffect(() => {
    console.log('=== Build-time Variables ===')
    console.log('VITE_BUILD_PUBLIC_VAR:', buildPublicVar)
  }, [])

  return (
    <div>
      <h1>Welcome to React</h1>

      <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px', borderRadius: '8px' }}>
        <h2>Environment Variable Test</h2>

        <h3>Build-time (baked into bundle)</h3>
        <p><strong>VITE_BUILD_PUBLIC_VAR:</strong> {buildPublicVar}</p>

        <p style={{ color: '#666', fontSize: '14px' }}>
          Note: Static sites only support build-time env vars (no server at runtime)
        </p>
      </div>

      <p>
        <Link to="/about">Go to About</Link>
      </p>
    </div>
  )
}

export default Home
