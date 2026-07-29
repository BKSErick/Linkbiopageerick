const fs = require('node:fs');
const path = require('node:path');

const indexPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

const checks = [
  ['loop infinito ativo', /animation:logo-scroll\s+24s\s+linear\s+infinite/],
  ['deslocamento contínuo de meia faixa', /@keyframes logo-scroll\{to\{transform:translateX\(-50%\)\}\}/],
  ['scrollbar Firefox escondida', /scrollbar-width:none/],
  ['scrollbar antiga do Edge escondida', /-ms-overflow-style:none/],
  ['scrollbar WebKit escondida', /\.logo-marquee::\-webkit-scrollbar\{display:none\}/],
  ['segunda faixa duplicada para continuidade', /class="logo-set"\s+aria-hidden="true"/],
];

const failures = checks
  .filter(([, pattern]) => !pattern.test(html))
  .map(([label]) => label);

if (/overflow-x:auto|\.logo-track\{animation:none\}/.test(html)) {
  failures.push('fallback de rolagem manual ainda presente');
}

if (failures.length) {
  console.error('[verify-linkbio-carousel] FALHOU:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('[verify-linkbio-carousel] OK: loop contínuo sem scrollbar nativa.');
