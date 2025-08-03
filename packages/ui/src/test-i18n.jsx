import React from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import useTranslation from './hooks/useTranslation'
import { Box, Typography, Button, Stack } from '@mui/material'

const TestI18nComponent = () => {
    const { t, changeLanguage, currentLanguage } = useTranslation()
    
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                {t('app.title')}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
                {t('app.description')}
            </Typography>
            
            <Typography variant="h6" gutterBottom>
                Idioma actual: {currentLanguage}
            </Typography>
            
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button 
                    variant="contained" 
                    onClick={() => changeLanguage('es')}
                    disabled={currentLanguage === 'es'}
                >
                    Español
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={() => changeLanguage('en')}
                    disabled={currentLanguage === 'en'}
                >
                    English
                </Button>
            </Stack>
            
            <Typography variant="h6" gutterBottom>
                Navegación:
            </Typography>
            <ul>
                <li>{t('navigation.chatflows')}</li>
                <li>{t('navigation.agentflows')}</li>
                <li>{t('navigation.tools')}</li>
                <li>{t('navigation.credentials')}</li>
                <li>{t('navigation.settings')}</li>
            </ul>
            
            <Typography variant="h6" gutterBottom>
                Botones:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Button variant="contained">{t('buttons.create')}</Button>
                <Button variant="outlined">{t('buttons.save')}</Button>
                <Button variant="text">{t('buttons.cancel')}</Button>
            </Stack>
            
            <Typography variant="h6" gutterBottom>
                Flujos de Chat:
            </Typography>
            <Typography variant="body2">
                {t('chatflows.subtitle')}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {t('chatflows.empty_state')}
            </Typography>
        </Box>
    )
}

// Solo para testing - no usar en producción
if (typeof window !== 'undefined' && window.location.search.includes('test-i18n')) {
    const container = document.getElementById('root')
    if (container) {
        const root = createRoot(container)
        root.render(<TestI18nComponent />)
    }
}

export default TestI18nComponent