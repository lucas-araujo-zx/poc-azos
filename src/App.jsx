import { useEffect, useState } from 'react'
import { catalog, clearToken, login, readToken, writeToken } from './api.js'
import { BatchDetail } from './BatchDetail.jsx'
import { Cases } from './Cases.jsx'
import { Disparos } from './Disparos.jsx'
import { Home } from './Home.jsx'
import { Login } from './Login.jsx'
import { Talk } from './Talk.jsx'

export function App() {
  const [token, setToken] = useState(readToken)
  const [catalogData, setCatalogData] = useState(null)
  const [screen, setScreen] = useState('home')
  const [caseItem, setCaseItem] = useState(null)
  const [batchId, setBatchId] = useState('')
  const [booting, setBooting] = useState(Boolean(readToken()))
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      setCatalogData(null)
      setScreen('home')
      setBooting(false)
      return undefined
    }
    let cancelled = false
    setBooting(true)
    catalog(token)
      .then((data) => {
        if (!cancelled) setCatalogData(data)
      })
      .catch((error) => {
        if (!cancelled) {
          clearToken()
          setToken('')
          setCatalogData(null)
          setLoginError(error.message)
        }
      })
      .finally(() => {
        if (!cancelled) setBooting(false)
      })
    return () => {
      cancelled = true
    }
  }, [token])

  async function handleLogin(next) {
    setLoginLoading(true)
    setLoginError('')
    try {
      await login(next)
      writeToken(next)
      setToken(next)
    } catch (error) {
      setLoginError(error.message)
    } finally {
      setLoginLoading(false)
    }
  }

  function signOut() {
    clearToken()
    setToken('')
    setCatalogData(null)
    setScreen('home')
    setCaseItem(null)
    setBatchId('')
  }

  if (!token || !catalogData) {
    return <Login error={loginError} loading={loginLoading || booting} onSubmit={handleLogin} />
  }

  if (screen === 'cases') {
    return (
      <Cases
        cases={catalogData.cases || []}
        onOpen={(item) => {
          setCaseItem(item)
          setScreen('test')
        }}
        onBack={() => setScreen('home')}
        onSignOut={signOut}
      />
    )
  }

  if (screen === 'test') {
    return (
      <Talk
        key={caseItem?.id ?? 'livre'}
        token={token}
        agent={catalogData.agent}
        variables={catalogData.variables || []}
        caseItem={caseItem}
        onBack={() => setScreen('home')}
        onChangeCase={() => setScreen('cases')}
        onSignOut={signOut}
      />
    )
  }

  if (screen === 'batch' && batchId) {
    return (
      <BatchDetail
        token={token}
        batchId={batchId}
        onBack={() => setScreen('dispatch')}
        onSignOut={signOut}
      />
    )
  }

  if (screen === 'dispatch') {
    return (
      <Disparos
        token={token}
        catalogData={catalogData}
        onOpenBatch={(id) => {
          setBatchId(id)
          setScreen('batch')
        }}
        onBack={() => setScreen('home')}
        onSignOut={signOut}
      />
    )
  }

  return (
    <Home
      agentName={catalogData.agent?.name || 'Liz'}
      onTest={() => setScreen('cases')}
      onDispatch={() => setScreen('dispatch')}
      onSignOut={signOut}
    />
  )
}
