import { AzosLogo } from './AzosLogo.jsx'

export function Home({ agentName, onTest, onDispatch, onSignOut }) {
  return (
    <div className="login-page home-page">
      <header className="login-top">
        <AzosLogo className="brand-logo" />
        <button type="button" className="quiet" onClick={onSignOut}>
          Sair
        </button>
      </header>
      <main className="home-stage">
        <p className="kicker">Liz · Cobrança</p>
        <h1>Como você quer testar o agente?</h1>
        <p className="home-lead">{agentName}</p>
        <div className="choice-grid">
          <article className="choice-card">
            <p className="kicker">Conversa por voz</p>
            <h2>Casos de uso</h2>
            <p>Escolha um caso da tabela e converse com a Liz por voz. Cada caso já vem com os dados do cliente preenchidos.</p>
            <button type="button" className="cta" onClick={onTest}>
              Ver casos
            </button>
          </article>
          <article className="choice-card">
            <p className="kicker">Telefonia</p>
            <h2>Disparo em lote</h2>
            <p>Envie uma planilha. Cada linha vira uma ligação do lote, feita pelo número de telefonia cadastrado no agente.</p>
            <button type="button" className="cta" onClick={onDispatch}>
              Abrir disparos
            </button>
          </article>
        </div>
      </main>
    </div>
  )
}
