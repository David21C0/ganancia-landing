import type { ClientType, UrgencyLevel } from '../components/diagnostic/types'
import { formatUrgency } from './diagnosticScoring'

type ReportPayload = {
  categoryTitle: string
  score: number
  maxScore: number
  percentage: number
  statusLevel: string
  statusDescription: string
  urgency: UrgencyLevel
  recommendations: string[]
  clientType: ClientType
}

export function openPrintableReport(data: ReportPayload) {
  const w = window.open('', '_blank', 'noopener,noreferrer')
  if (!w) return

  const recs = data.recommendations.map((r, i) => `<li>${i + 1}. ${escapeHtml(r)}</li>`).join('')

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Reporte de diagnóstico — +Ganancias</title>
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.5; color: #0f172a; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .meta { color: #64748b; font-size: 0.9rem; margin-bottom: 1.5rem; }
    .box { border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin: 1rem 0; }
    .urgency { background: #f0fdf4; border-color: #86efac; }
    ul { padding-left: 1.2rem; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <h1>Resultados del diagnóstico</h1>
  <p class="meta">${escapeHtml(data.categoryTitle)} · +Ganancias · Tipo: ${escapeHtml(
    data.clientType,
  )}</p>
  <div class="box">
    <p><strong>Estado global:</strong> ${escapeHtml(data.statusLevel)}</p>
    <p>${escapeHtml(data.statusDescription)}</p>
    <p><strong>Puntuación:</strong> ${data.score} / ${data.maxScore} (${Math.round(data.percentage)}%)</p>
  </div>
  <div class="box urgency">
    <p><strong>Nivel de urgencia sugerido (orientativo):</strong> ${escapeHtml(formatUrgency(data.urgency))}</p>
    <p>Derivado de tus respuestas. No reemplaza una valoración con un asesor.</p>
  </div>
  <h2>Recomendaciones clave</h2>
  <ul>${recs}</ul>
  <p class="meta">Documento informativo. +Ganancias no garantiza resultados financieros.</p>
  <script>window.onload = function() { window.print(); }</script>
</body>
</html>`

  w.document.write(html)
  w.document.close()
  w.focus()
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export type { ReportPayload }
