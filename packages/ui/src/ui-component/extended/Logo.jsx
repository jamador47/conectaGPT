import conectaGPTLogo from '@/assets/images/conectaGPT.png'

import { useSelector } from 'react-redux'
import useTranslation from '@/hooks/useTranslation'

// ==============================|| LOGO ||============================== //

const Logo = () => {
    const customization = useSelector((state) => state.customization)
    const { t } = useTranslation()

    return (
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '10px',
                justifyContent: 'center'
            }}
        >
            <img
                style={{
                    objectFit: 'contain',
                    height: 'auto',
                    width: 'clamp(80px, 15vw, 120px)',
                    maxWidth: '120px',
                    minWidth: '80px',
                    filter: customization.isDarkMode ? 'none' : 'drop-shadow(0 1px 3px rgba(0,0,0,0.1))',
                    transition: 'all 0.3s ease'
                }}
                src={conectaGPTLogo}
                alt={t('app.name')}
            />
        </div>
    )
}

export default Logo
