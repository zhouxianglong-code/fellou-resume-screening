export function parseCriteria(value) {
  const terms = value.split(/[\n,，;；]/).map(x => x.trim()).filter(Boolean);
  if (terms.length > 30) throw new Error('请将技能要求控制在 30 项以内。');
  if (terms.some(x => /年龄|性别|男女|男性|女性|婚育|已婚|未婚|生育|民族|宗教|残疾|户籍|籍贯|星座|血型|颜值|长相|政治面貌|\d+岁/.test(x))) throw new Error('请填写工作技能、项目或行业经验，不使用个人敏感属性作为筛选条件。');
  return [...new Set(terms)];
}
export function matchEvidence(text, criteria) {
  const lines = text.split(/\n|[。！？]/).map(x => x.trim()).filter(Boolean);
  return criteria.map(term => {
    const aliases = term.split('|').map(x => x.trim()).filter(Boolean);
    const evidence = lines.find(line => aliases.some(alias => {
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = /^[\x00-\x7F]+$/.test(alias) ? `(?<![a-z0-9])${escaped}(?![a-z0-9])` : escaped;
      return new RegExp(pattern, 'i').test(line);
    }));
    return { term, evidence: evidence || '', status: evidence ? '已提及' : '待核实' };
  });
}
export function csvCell(value) {
  let text = String(value ?? '');
  if (/^[\s]*[=+@-]/.test(text)) text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
}
export function exportCSV(rows, criteria) {
  const header = ['候选人', '人工标记', '备注', ...criteria];
  return '\uFEFF' + [header, ...rows.map(row => [row.name, row.mark, row.note, ...matchEvidence(row.text, criteria).map(x => x.evidence || '待核实：当前摘要未提及')])].map(row => row.map(csvCell).join(',')).join('\r\n');
}
