import type { ClientType } from './types'

export type TypeCopy = {
  formTitle: string
  formSubtitle: string
  nameLabel: string
  namePlaceholder: string
  showOrg: boolean
  orgLabel: string
  orgPlaceholder: string
  situationLabel: string
  situationPlaceholder: string
}

const copy: Record<ClientType, TypeCopy> = {
  persona: {
    formTitle: 'Diagnóstico — Perfil personal',
    formSubtitle:
      'Con estos datos damos un primer acercamiento concreto; el detalle se profundiza con tu asesor.',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'Como figura en tu identificación',
    showOrg: false,
    orgLabel: '',
    orgPlaceholder: '',
    situationLabel: 'Situación financiera actual',
    situationPlaceholder:
      'Ej. deudas, presupuesto, prioridades, lo que te preocupa hoy…',
  },
  empresa: {
    formTitle: 'Diagnóstico — Empresa',
    formSubtitle:
      'Enfocamos el diagnóstico en estructura, flujo y obligaciones de la compañía.',
    nameLabel: 'Tu nombre (contacto)',
    namePlaceholder: 'Persona de contacto o responsable',
    showOrg: true,
    orgLabel: 'Razón social o nombre de la empresa',
    orgPlaceholder: 'Como figura en cámara de comercio o RUT',
    situationLabel: 'Situación financiera y operativa',
    situationPlaceholder:
      'Ej. flujo de caja, proveedores, bancos, nómina, riesgos inmediatos…',
  },
  negocio: {
    formTitle: 'Diagnóstico — Negocio / emprendimiento',
    formSubtitle:
      'Priorizamos liquidez, costos e ingresos del emprendimiento con un enfoque práctico.',
    nameLabel: 'Tu nombre (titular)',
    namePlaceholder: 'Quien recibe el acompañamiento',
    showOrg: true,
    orgLabel: 'Nombre comercial o del negocio',
    orgPlaceholder: 'Marca, local o proyecto',
    situationLabel: 'Situación del negocio',
    situationPlaceholder:
      'Ej. ingresos/egresos, inventario, alquiler, deudas del negocio…',
  },
}

export function getDiagnosticCopy(t: ClientType): TypeCopy {
  return copy[t]
}
