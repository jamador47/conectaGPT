import { Box, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import conectaGPTLogo from '@/assets/images/conectaGPT.png'

// ==============================|| SPLASH SCREEN ||============================== //

const SplashScreen = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.background.default,
                zIndex: 9999
            }}
        >
            {/* ConectaGPT Logo */}
            <Box
                sx={{
                    mb: 4,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                        '0%': { opacity: 1 },
                        '50%': { opacity: 0.7 },
                        '100%': { opacity: 1 }
                    }
                }}
            >
                <img
                    src={conectaGPTLogo}
                    alt='ConectaGPT'
                    style={{
                        width: 200,
                        height: 'auto',
                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
                    }}
                />
            </Box>

            {/* Loading indicator */}
            <CircularProgress
                size={40}
                thickness={4}
                sx={{
                    color: theme.palette.primary.main,
                    animation: 'spin 1s linear infinite'
                }}
            />
        </Box>
    )
}

export default SplashScreen
