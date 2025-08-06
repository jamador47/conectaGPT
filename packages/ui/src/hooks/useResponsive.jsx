import { useTheme, useMediaQuery } from '@mui/material'

// ==============================|| RESPONSIVE HOOK ||============================== //

const useResponsive = () => {
    const theme = useTheme()

    // Breakpoint queries
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg'))
    const isExtraLarge = useMediaQuery(theme.breakpoints.up('xl'))

    // Specific size queries
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    const isMediumScreen = useMediaQuery('(max-width:960px)')
    const isLargeScreen = useMediaQuery('(min-width:1280px)')

    // Orientation
    const isLandscape = useMediaQuery('(orientation: landscape)')
    const isPortrait = useMediaQuery('(orientation: portrait)')

    // Touch device detection
    const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)')

    // Responsive values helper function
    const getResponsiveValue = (values) => {
        const { xs, sm, md, lg, xl } = values

        if (isExtraLarge && xl !== undefined) return xl
        if (isLargeDesktop && lg !== undefined) return lg
        if (isDesktop && md !== undefined) return md
        if (isTablet && sm !== undefined) return sm
        if (isMobile && xs !== undefined) return xs

        // Fallback to largest available value
        return xl || lg || md || sm || xs
    }

    // Common responsive spacing
    const spacing = {
        xs: theme.spacing(1),
        sm: theme.spacing(2),
        md: theme.spacing(3),
        lg: theme.spacing(4),
        xl: theme.spacing(5)
    }

    return {
        // Breakpoint booleans
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        isExtraLarge,

        // Size booleans
        isSmallScreen,
        isMediumScreen,
        isLargeScreen,

        // Orientation
        isLandscape,
        isPortrait,

        // Device type
        isTouchDevice,

        // Helper functions
        getResponsiveValue,

        // Common values
        spacing: getResponsiveValue(spacing),

        // Responsive breakpoints object for sx prop
        breakpoints: theme.breakpoints
    }
}

export default useResponsive
