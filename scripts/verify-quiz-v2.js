const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const quiz = fs.readFileSync(path.join(ROOT, 'quiz.html'), 'utf8');
const result = fs.readFileSync(path.join(ROOT, 'resultado.html'), 'utf8');

function fail(message) {
  console.error(`[verify-quiz-v2] ${message}`);
  process.exit(1);
}

function assertContains(source, needle, context) {
  if (!source.includes(needle)) fail(`${context} não contém: ${needle}`);
}

const stepCount = (quiz.match(/class="step/g) || []).length;
if (stepCount !== 5) fail(`quiz.html deve ter 5 perguntas; encontrou ${stepCount}.`);

[
  'Qual area gera mais gargalo na operacao da sua empresa hoje?',
  'Com que frequencia decisoes ou pedidos ficam travados',
  'Quantas pessoas trabalham na execucao da operacao',
  'Qual e o faturamento mensal da sua empresa?',
  'O que voce mais quer resolver primeiro?',
  'gargalo_primario',
  'segment',
  'intencao',
  'dor_score',
  'equipe_porte',
  'QuizStart',
  'QuizStep',
  'QuizComplete',
].forEach((needle) => assertContains(quiz, needle, 'quiz.html'));

[
  'Seu gargalo principal e gestao de OS',
  'Operacoes com o perfil que voce descreveu perdem em media entre 8 e 15 horas por semana',
  'Quero ver o diagnostico completo no WhatsApp',
  'Ver o OStrack em funcionamento',
  'utm_source=quiz&utm_medium=cta&utm_campaign=linkbio',
  'OStrackCTAClick',
  'diag_gargalo_primario',
  'diag_intencao',
].forEach((needle) => assertContains(result, needle, 'resultado.html'));

console.log('[verify-quiz-v2] OK: quiz v2 validado estaticamente.');
