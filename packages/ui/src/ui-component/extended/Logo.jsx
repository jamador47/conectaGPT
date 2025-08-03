import logo from '@/assets/images/conectagpt_white.svg'
import logoDark from '@/assets/images/conectagpt_dark.svg'
import logoFallback from '@/assets/images/flowise_white.svg'
import logoDarkFallback from '@/assets/images/flowise_dark.svg'

import { useSelector } from 'react-redux'
import useTranslation from '@/hooks/useTranslation'

// ==============================|| LOGO ||============================== //

const Logo = () => {
    const customization = useSelector((state) => state.customization)
    const { t } = useTranslation()

    // Use ConectaGPT logo if available, fallback to Flowise logo
    const logoSrc = customization.isDarkMode 
        ? (logoDark || logoDarkFallback) 
        : (logo || logoFallback)

    return (
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', marginLeft: '10px' }}>
            <img
                style={{ objectFit: 'contain', height: 'auto', width: 150 }}
                src={logoSrc}
                alt={t('app.name')}
            />
        </div>
    )
}

export default Logo
