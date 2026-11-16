import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cleanValue, parseCsv } from './sheet.js'

const here = dirname(fileURLToPath(import.meta.url))

// Variáveis dinâmicas do agente da Liz. Cada caso precisa preencher todas.
export const VARIABLE_FIELDS = [
  'primeiro_nome',
  'nome_completo',
  'whatsapp_final',
  'numero_apolice',
  'qtd_parcelas_aberto',
  'parcelas_descricao',
  'valor_total',
  'data_limite_pagamento',
  'forma_pagamento_atual',
  'protegidos',
  'outra_apolice_atraso',
  'ano_nascimento',
  'nome_do_corretor',
  'produtos_da_cobertura',
]

export function casesFromCsv(text) {
  const parsed = parseCsv(text)
  if (parsed.error) return []
  const header = parsed.headers.map((name) => name.trim().toLowerCase())
  return parsed.rows
    .map((columns) => {
      const record = {}
      header.forEach((name, index) => {
        if (name) record[name] = cleanValue(columns[index])
      })
      return record
    })
    .filter((record) => record.id_caso)
}

export function presentCase(record) {
  const values = {}
  for (const name of VARIABLE_FIELDS) {
    values[name] = record[name] ?? ''
  }
  return {
    id: record.id_caso,
    title: record.caso ?? '',
    description: record.o_que_testar ?? '',
    values,
  }
}

let cache = null

export function listCases() {
  if (!cache) {
    const text = readFileSync(join(here, 'casos.csv'), 'utf8')
    cache = casesFromCsv(text).map(presentCase)
  }
  return cache
}
