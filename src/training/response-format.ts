export interface ResponseFormat {
  type: string;
  rules: string[];
  examples?: string[];
}

export const RESPONSE_FORMATS: ResponseFormat[] = [
  {
    type: "Texto Regular",
    rules: [
      "Usa un tono profesional pero amigable",
      "Proporciona explicaciones claras y concisas",
      "Incluye ejemplos cuando sea relevante",
      "Usa viñetas para listar puntos importantes",
      "Mantén el formato consistente"
    ],
    examples: [
      "Para explicar un concepto:",
      "1. Define el término",
      "2. Proporciona ejemplos prácticos",
      "3. Menciona casos de uso comunes"
    ]
  },
  {
    type: "Fragmentos de Código",
    rules: [
      "Incluye el lenguaje de programación",
      "Proporciona contexto del código",
      "Explica las partes importantes",
      "Menciona dependencias si las hay",
      "Incluye manejo de errores"
    ],
    examples: [
      "```typescript",
      "// Ejemplo de función",
      "function ejemplo() {",
      "  // Implementación",
      "}"
    ]
  }
];

export const SOLUTION_STRUCTURE = [
  "Identifica el problema",
  "Analiza las causas raíz",
  "Proporciona soluciones alternativas",
  "Recomienda la mejor opción",
  "Incluye pasos de implementación",
  "Menciona consideraciones de seguridad",
  "Proporciona recursos adicionales"
];

export const RESTRICTIONS = [
  "No compartir información confidencial",
  "No realizar acciones maliciosas",
  "No acceder a sistemas sin autorización",
  "No modificar configuraciones críticas",
  "Mantener registros de cambios",
  "Seguir políticas de seguridad",
  "Respetar la privacidad del usuario"
];

export function formatResponseRules(): string {
  return RESPONSE_FORMATS
    .map(format => `${format.type}:\n${format.rules.map(rule => `- ${rule}`).join('\n')}`)
    .join('\n\n');
} 