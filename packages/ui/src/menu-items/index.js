import getDashboardMenuItems from './dashboardTranslated'
import { useTranslation } from '@/hooks/useTranslation'

// ==============================|| MENU ITEMS WITH i18n ||============================== //

export const useMenuItems = () => {
    const { t } = useTranslation()
    
    return {
        items: [getDashboardMenuItems(t)]
    }
}

// Legacy export for backward compatibility (will use Spanish by default)
export const menuItems = {
    items: [getDashboardMenuItems((key) => {
        // Simple fallback translation function
        const translations = {
            'navigation.chatflows': 'Flujos de Chat',
            'navigation.agentflows': 'Flujos de Agente',
            'navigation.executions': 'Ejecuciones',
            'navigation.marketplaces': 'Mercados',
            'navigation.tools': 'Herramientas',
            'navigation.assistants': 'Asistentes',
            'navigation.credentials': 'Credenciales',
            'navigation.variables': 'Variables',
            'navigation.apikeys': 'Claves API',
            'navigation.document_stores': 'Almacenes de Documentos',
            'navigation.evaluations': 'Evaluaciones',
            'navigation.datasets': 'Conjuntos de Datos',
            'navigation.evaluators': 'Evaluadores',
            'navigation.user_workspace_management': 'Gestión de Usuarios y Espacios de Trabajo',
            'navigation.sso_config': 'Configuración SSO',
            'navigation.roles': 'Roles',
            'navigation.users': 'Usuarios',
            'navigation.workspaces': 'Espacios de Trabajo',
            'navigation.login_activity': 'Actividad de Inicio de Sesión',
            'navigation.others': 'Otros',
            'navigation.logs': 'Registros',
            'navigation.account_settings': 'Configuración de Cuenta'
        }
        return translations[key] || key
    })]
}
