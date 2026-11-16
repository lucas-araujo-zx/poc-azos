import assert from 'node:assert/strict'
import test from 'node:test'
import { VARIABLE_FIELDS, casesFromCsv, listCases, presentCase } from './casos.js'

test('a base tem casos com ID único e título', () => {
  const cases = listCases()
  assert.ok(cases.length >= 10)
  const ids = new Set(cases.map((item) => item.id))
  assert.equal(ids.size, cases.length)
  for (const item of cases) {
    assert.ok(item.title.trim())
    assert.ok(item.description.trim())
  }
})

test('cada caso preenche todas as variáveis dinâmicas do agente', () => {
  for (const item of listCases()) {
    for (const name of VARIABLE_FIELDS) {
      assert.ok(item.values[name]?.trim(), `${item.id} sem ${name}`)
    }
  }
})

test('linhas sem id_caso são ignoradas', () => {
  const csv = [
    'id_caso;caso;o_que_testar;primeiro_nome',
    'a;Primeiro;Teste;Ana',
    ';Sem id;Teste;Bruno',
  ].join('\n')
  const rows = casesFromCsv(csv)
  assert.equal(rows.length, 1)
  assert.equal(rows[0].primeiro_nome, 'Ana')
})

test('presentCase separa título, descrição e valores', () => {
  const item = presentCase({
    id_caso: 'x',
    caso: 'Caso X',
    o_que_testar: 'Testar X',
    primeiro_nome: 'Maria',
  })
  assert.equal(item.id, 'x')
  assert.equal(item.title, 'Caso X')
  assert.equal(item.description, 'Testar X')
  assert.equal(item.values.primeiro_nome, 'Maria')
  assert.equal(item.values.nome_do_corretor, '')
})
