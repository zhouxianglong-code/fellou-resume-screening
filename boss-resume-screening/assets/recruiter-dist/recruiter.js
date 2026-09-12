(() => {
'use strict';
function parseCriteria(value) {
  const terms = value.split(/[\n,，;；]/).map(x => x.trim()).filter(Boolean);
  if (terms.length > 30) throw new Error('请将技能要求控制在 30 项以内。');
  if (terms.some(x => /年龄|性别|男女|男性|女性|婚育|已婚|未婚|生育|民族|宗教|残疾|户籍|籍贯|星座|血型|颜值|长相|政治面貌|\d+岁/.test(x))) throw new Error('请填写工作技能、项目或行业经验，不使用个人敏感属性作为筛选条件。');
  return [...new Set(terms)];
}
// Literal evidence only: a negated mention still needs human interpretation.
function matchEvidence(text, criteria) {
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
function csvCell(value) {
  let text = String(value ?? '');
  // Prevent spreadsheet apps from treating candidate-provided text as formulas.
  if (/^[\s]*[=+@-]/.test(text)) text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
}
function exportCSV(rows, criteria) {
  // Export every supplied row; the panel's display filter does not limit export.
  const header = ['候选人', '人工标记', '备注', ...criteria];
  return '\uFEFF' + [header, ...rows.map(row => [row.name, row.mark, row.note, ...matchEvidence(row.text, criteria).map(x => x.evidence || '待核实：当前摘要未提及')])].map(row => row.map(csvCell).join(',')).join('\r\n');
}

const panelCSS = ":host{all:initial;font-family:system-ui,\"PingFang SC\",sans-serif;color:#203b36;font-size:14px}*{box-sizing:border-box}button,input,textarea,select{font:inherit}button{cursor:pointer;border:1px solid #c8d8d3;border-radius:6px;background:white;color:#234e43;padding:8px 11px;transition:background .16s,transform .16s}button:hover{background:#edf6f1}button:active{transform:translateY(1px)}button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible{outline:2px solid #12816c;outline-offset:2px}button:disabled{opacity:.45;cursor:default}.launch{position:fixed;right:22px;bottom:28px;background:#156d5b;color:white;box-shadow:0 4px 18px #173c3028}.panel{position:fixed;right:16px;top:22px;bottom:22px;width:min(490px,calc(100vw - 32px));background:#fff;border:1px solid #cbdbd5;box-shadow:0 16px 60px #0b302b36;border-radius:12px;display:flex;flex-direction:column;animation:enter .2s ease-out}.header{padding:17px 20px;background:#f1f6f2;border-bottom:1px solid #dce7e1;display:flex;align-items:center;justify-content:space-between}.header h2{font-size:18px;margin:3px 0}.eyebrow{font-size:11px;color:#58726a}.body{padding:18px 20px;overflow:auto;min-height:0;flex:1}label{display:block;font-weight:600;margin:10px 0 7px}textarea,input,select{width:100%;border:1px solid #bdcec6;border-radius:5px;padding:9px;color:#253c35;background:white}textarea{resize:vertical;min-height:84px}.hint{font-size:12px;line-height:1.65;color:#677970;margin:8px 0}.actions{display:flex;gap:7px;flex-wrap:wrap;margin:12px 0}.primary{background:#156d5b;color:#fff;border-color:#156d5b}.primary:hover{background:#105444}.status{background:#f5f3e9;padding:10px 12px;font-size:12px;line-height:1.6;border-left:3px solid #b0a167;margin:14px 0}.candidate{padding:16px 0;border-top:1px solid #dbe5de}.candidate h3{font-size:16px;margin:0 0 8px;overflow-wrap:anywhere}.evidence{font-size:12px;line-height:1.65;margin:6px 0;overflow-wrap:anywhere}.found{color:#176b54}.missing{color:#86641e}.raw{white-space:pre-wrap;font-size:12px;line-height:1.7;color:#64736b;max-height:200px;overflow:auto}.candidate input{margin-top:8px}summary{cursor:pointer;font-size:12px;margin:10px 0}.footer{padding:10px 20px;border-top:1px solid #dbe5de;font-size:11px;color:#687b70} [hidden]{display:none!important}@keyframes enter{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:none}}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}@media(max-width:540px){.panel{top:8px;bottom:8px;right:8px;width:calc(100vw - 16px)}.body{padding:12px}.header{padding:12px}}\n";
if (!document.getElementById('boss-recruiter-review')) {
  const host = document.createElement('div');
  host.id = 'boss-recruiter-review';
  host.style.cssText = 'position:fixed;z-index:2147483646';
  const shadow = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style'); style.textContent = panelCSS; shadow.append(style);
  const el = (tag, text, cls) => { const node = document.createElement(tag); if (text) node.textContent = text; if (cls) node.className = cls; return node; };
  const launch = el('button', '候选人复核', 'launch');
  const panel = el('section', '', 'panel'); panel.hidden = true; panel.setAttribute('aria-label', '候选人复核');
  const header = el('header', '', 'header');
  const title = el('div'); title.append(el('div', 'BOSS HELPER · 招聘版 0.1', 'eyebrow'), el('h2', '候选人复核'));
  const close = el('button', '收起'); header.append(title, close);
  const body = el('div', '', 'body');
  const role = el('input'); role.id = 'role'; role.placeholder = '例如：产品内容运营';
  const roleLabel = el('label', '岗位名称'); roleLabel.htmlFor = role.id;
  const criteria = el('textarea'); criteria.id = 'criteria'; criteria.placeholder = '每行一项，例如：\n内容运营\nSQL\n用户增长|增长运营';
  const criteriaLabel = el('label', '需要核实的技能 / 工作经验'); criteriaLabel.htmlFor = criteria.id;
  const hint = el('p', '每行一项，别名用 | 分隔。按文字查找证据，不代表技能熟练度；未提及的要求需人工核实。', 'hint');
  const actions = el('div', '', 'actions');
  const scan = el('button', '读取当前列表', 'primary');
  const apply = el('button', '核对要求');
  const download = el('button', '导出 CSV'); download.disabled = true;
  const reset = el('button', '清空记录');
  actions.append(scan, apply, download, reset);
  const status = el('div', '打开招聘端“推荐牛人”或“搜索”，然后读取当前已加载的列表。', 'status'); status.setAttribute('role', 'status');
  const filter = el('select'); filter.setAttribute('aria-label', '显示记录');
  ['全部记录', '未复核', '待进一步沟通', '暂存'].forEach(x => {const option = el('option', x); option.value = x; filter.append(option);});
  const list = el('div');
  const manual = el('details'); manual.append(el('summary', '未识别到卡片？手动添加摘要'));
  const name = el('input'); name.placeholder = '候选人姓名或编号'; name.setAttribute('aria-label', '候选人姓名或编号');
  const excerpt = el('textarea'); excerpt.placeholder = '粘贴当前候选人的工作经历和技能摘要'; excerpt.setAttribute('aria-label', '候选人摘要');
  const add = el('button', '添加摘要'); manual.append(name, excerpt, add);
  body.append(roleLabel, role, criteriaLabel, criteria, hint, actions, status, filter, list, manual);
  panel.append(header, body, el('footer', '资料仅保留在当前页面内存中；刷新即清空。关闭页面前请导出。', 'footer'));
  shadow.append(launch, panel); document.documentElement.append(host);
  let rows = []; let terms = []; let nextId = 1;
  const marks = ['未复核', '待进一步沟通', '暂存'];
  function message(text) { status.textContent = text; }
  function render() {
    list.replaceChildren(); download.disabled = rows.length === 0;
    const visible = rows.filter(row => filter.value === '全部记录' || row.mark === filter.value);
    for (const row of visible) {
      const item = el('article', '', 'candidate'); item.append(el('h3', row.name));
      for (const result of matchEvidence(row.text, terms)) {
        item.append(el('div', `${result.term} · ${result.status}${result.evidence ? '\n' + result.evidence : '：当前摘要未提及'}`, 'evidence ' + (result.evidence ? 'found' : 'missing')));
      }
      const details = el('details'); details.append(el('summary', '查看原始摘要'), el('div', row.text, 'raw')); item.append(details);
      const mark = el('select'); mark.setAttribute('aria-label', `${row.name}的人工标记`);
      for (const value of marks) { const option = el('option', value); option.value = value; mark.append(option); } mark.value = row.mark;
      mark.onchange = () => { row.mark = mark.value; if (filter.value !== '全部记录') render(); };
      const note = el('input'); note.placeholder = '复核备注'; note.value = row.note; note.setAttribute('aria-label', `${row.name}的备注`); note.oninput = () => { row.note = note.value; };
      const remove = el('button', '移除此条'); remove.onclick = () => { rows = rows.filter(x => x.id !== row.id); render(); message(`当前 ${rows.length} 条摘要。`); };
      const tools = el('div', '', 'actions'); tools.append(remove); item.append(mark, note, tools); list.append(item);
    }
    if (!visible.length) list.append(el('p', '暂无记录。读取列表或手动添加候选人摘要。', 'hint'));
  }
  function addRow(candidateName, text) {
    // Deduplicate exact summaries in this page session, not candidate identities.
    if (rows.some(row => row.text === text)) return false;
    rows.push({ id: nextId++, name: candidateName, text, mark: '未复核', note: '' }); return true;
  }
  function documents() {
    // Cross-origin frames are inaccessible; only traverse readable documents.
    const docs = []; const seen = new Set();
    function visit(doc) { if (seen.has(doc)) return; seen.add(doc); docs.push(doc); for (const frame of doc.querySelectorAll('iframe')) { try { if (frame.contentDocument) visit(frame.contentDocument); } catch {} } }
    visit(document); return docs;
  }
  function readCards() {
    let added = 0; const seen = new Set();
    for (const doc of documents()) {
      // Locate the smallest candidate container around a visible greeting control.
      // This supports the recruitment list nested in BOSS's same-origin iframe.
      const possible = [...doc.querySelectorAll('button,a,[role="button"],span')].filter(x => /^(打招呼|继续沟通|立即沟通)$/.test(x.textContent.trim()) && x.getClientRects().length);
      const controls = possible.filter(x => !possible.some(other => other !== x && x.contains(other)));
      for (const control of controls) {
        let card = control.parentElement;
        for (let depth = 0; card && depth < 10; depth++, card = card.parentElement) {
          const text = card.innerText?.trim() || '';
          const count = controls.filter(x => card.contains(x)).length;
          if (count > 1 || text.length > 10000) break;
          if (text.length < 60 || !/(优势|期望|最近关注|工作经历|\d{4}[.年/-])/.test(text)) continue;
          if (seen.has(card)) break; seen.add(card);
          const heading = card.querySelector('[class*="geek-name"],[class*="name-text"],[class*="candidate-name"]');
          const image = card.querySelector('img[alt]');
          const candidateName = heading?.textContent?.trim() || image?.getAttribute('alt')?.trim() || `候选人 ${nextId}（请核对姓名）`;
          if (addRow(candidateName, text)) added++;
          break;
        }
      }
    }
    render(); message(added ? `新增 ${added} 条，共 ${rows.length} 条。请展开摘要核对卡片边界和姓名；切换岗位前请导出并清空。` : (seen.size ? `本页候选人已读取，共 ${rows.length} 条，未重复添加。` : '未识别到候选人卡片。请确认当前在推荐牛人 / 搜索列表，或手动添加摘要。'));
  }
  launch.onclick = () => { panel.hidden = false; launch.hidden = true; close.focus(); };
  close.onclick = () => { panel.hidden = true; launch.hidden = false; launch.focus(); };
  panel.onkeydown = event => { if (event.key === 'Escape') close.click(); };
  scan.onclick = readCards;
  apply.onclick = () => { try { terms = parseCriteria(criteria.value); render(); message(`已核对 ${rows.length} 条摘要、${terms.length} 项要求。文字命中不等同于能力证明。`); } catch(error) { message(error.message); } };
  add.onclick = () => { const text = excerpt.value.trim(); if (!name.value.trim() || !text) return message('请填写姓名或编号，以及候选人摘要。'); addRow(name.value.trim(), text); name.value = ''; excerpt.value = ''; render(); message(`当前 ${rows.length} 条摘要。`); };
  filter.onchange = render;
  reset.onclick = () => { rows = []; render(); message('当前复核记录已清空。'); };
  download.onclick = () => {
    try { terms = parseCriteria(criteria.value); } catch(error) { return message(error.message); }
    const url = URL.createObjectURL(new Blob([exportCSV(rows, terms)], { type: 'text/csv;charset=utf-8;' }));
    const anchor = el('a'); anchor.href = url; anchor.download = `${(role.value.trim() || '候选人复核').replace(/[\\/:*?"<>|]/g, '_')}.csv`; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 10000);
    render(); message(`已导出 ${rows.length} 条复核记录。`);
  };
  render();
}

})();
