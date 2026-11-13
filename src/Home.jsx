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
            <p className="kicker">Bancada</p>
            <h2>Teste interno</h2>
            <p>Preencha as variáveis de entrada e converse por voz ou texto. O resultado volta com o ID da conversa.</p>
            <button type="button" className="cta" onClick={onTest}>
              Abrir teste
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
