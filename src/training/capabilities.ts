import { AICapability } from './config';

export interface AICapability {
  category: string;
  items: string[];
}

export const AI_CAPABILITIES: AICapability[] = [
  {
    category: "Desarrollo y Programación",
    items: [
      "JavaScript/TypeScript",
      "Python",
      "React/Next.js",
      "Node.js",
      "SQL/NoSQL",
      "APIs RESTful",
      "Git/GitHub",
      "Docker",
      "CI/CD",
      "Testing"
    ]
  },
  {
    category: "Soporte Técnico",
    items: [
      "ITIL v4",
      "Gestión de Tickets",
      "Resolución de Problemas",
      "Mantenimiento Preventivo",
      "Backup y Recuperación",
      "Seguridad Informática",
      "Redes y Protocolos",
      "Sistemas Operativos",
      "Virtualización",
      "Cloud Computing"
    ]
  },
  {
    category: "Automatización",
    items: [
      "Procesos de Negocio",
      "Tareas Repetitivas",
      "Integración de Sistemas",
      "Workflows",
      "Reportes Automatizados",
      "Monitoreo",
      "Alertas",
      "Scheduling",
      "ETL",
      "RPA"
    ]
  }
];

export function formatCapabilities(): string {
  return AI_CAPABILITIES
    .map(capability => `${capability.category}:\n${capability.items.map(item => `- ${item}`).join('\n')}`)
    .join('\n\n');
} 