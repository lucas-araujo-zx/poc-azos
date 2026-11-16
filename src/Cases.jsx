import { AzosLogo } from './AzosLogo.jsx'

function openFromKey(event, item, onOpen) {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  onOpen(item)
}

export function Cases({ cases, onOpen, onBack, onSignOut }) {
  return (
    <div className="dispatch-page">
      <header className="talk-top">
        <div className="talk-brand">
          <AzosLogo className="brand-logo" />
          <p className="talk-user">Casos de uso por voz</p>
        </div>
        <div className="talk-actions">
          <button type="button" className="quiet" onClick={onBack}>
            Início
          </button>
          <button type="button" className="quiet" onClick={onSignOut}>
            Sair
          </button>
        </div>
      </header>
      <main className="dispatch-main">
        <p className="kicker">Conversa por voz</p>
        <h1>Escolha um caso para testar</h1>
        <p className="home-lead">
          Cada caso preenche os dados da ligação com um perfil fictício e abre a conversa por voz pronta para
          começar. Você pode trocar de caso a qualquer momento, pelo botão Trocar caso.
        </p>

        {cases.length === 0 ? (
          <p className="sheet-alert" role="alert">
            Não encontrei a base de casos. Peça para a equipe publicar a bancada de novo.
          </p>
        ) : (
          <div className="sheet-scroll">
            <table className="column-table case-table">
              <thead>
                <tr>
                  <th>Caso de uso</th>
                  <th>O que testar</th>
                  <th>Cliente</th>
                  <th>Parcelas</th>
                  <th>Total em aberto</th>
                  <th>Pagamento</th>
                  <th aria-label="Ação" />
                </tr>
              </thead>
              <tbody>
                {cases.map((item) => (
                  <tr
                    key={item.id}
                    className="case-row"
                    tabIndex={0}
                    onClick={() => onOpen(item)}
                    onKeyDown={(event) => openFromKey(event, item, onOpen)}
                  >
                    <td>
                      <strong>{item.title}</strong>
                    </td>
                    <td>{item.description}</td>
                    <td>{item.values.nome_completo || '—'}</td>
                    <td>{item.values.qtd_parcelas_aberto || '—'}</td>
                    <td>{item.values.valor_total || '—'}</td>
                    <td>{item.values.forma_pagamento_atual || '—'}</td>
                    <td>
                      <button
                        type="button"
                        className="mode-switch"
                        onClick={(event) => {
                          event.stopPropagation()
                          onOpen(item)
                        }}
                      >
                        Testar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="sheet-note">Todos os dados são fictícios e servem só para demonstração.</p>
      </main>
    </div>
  )
}
