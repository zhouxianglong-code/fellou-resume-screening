import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCriteria, matchEvidence, exportCSV } from './core.mjs';
test('criteria support aliases and deduplication', () => assert.deepEqual(parseCriteria('SQL\n增长|增长运营，SQL'), ['SQL', '增长|增长运营']));
test('reject sensitive criteria', () => assert.throws(() => parseCriteria('女性，30岁以下')));
test('literal matching, case and word boundaries', () => {
  const results = matchEvidence('使用 sql 和 C++\n熟悉邮件 mail\n增长运营经验', ['SQL', 'C++', 'AI', '增长|增长运营']);
  assert.deepEqual(results.map(x => x.status), ['已提及', '已提及', '待核实', '已提及']);
});
test('absence stays unverified; negation remains visible', () => {
  assert.equal(matchEvidence('没有 SQL 经验', ['SQL'])[0].evidence, '没有 SQL 经验');
  assert.equal(matchEvidence('运营经验', ['SQL'])[0].status, '待核实');
});
test('csv escapes quotes and spreadsheet formulas', () => {
 const csv = exportCSV([{name:'=1+1',mark:'未复核',note:'他说"好"',text:'会SQL'}], ['SQL']);
 assert.ok(csv.startsWith('\uFEFF')); assert.ok(csv.includes("'=")); assert.ok(csv.includes('他说""好""')); assert.ok(csv.includes('会SQL'));
});
