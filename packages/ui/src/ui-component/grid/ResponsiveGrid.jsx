import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import useResponsive from '@/hooks/useResponsive'

// ==============================|| RESPONSIVE GRID ||============================== //

const ResponsiveGrid = ({
    children,
    spacing = 2,
    minItemWidth = '300px',
    maxColumns = { xs: 1, sm: 2, md: 3, lg: 4 },
    sx = {},
    ...other
}) => {
    const { isMobile, isTablet, isDesktop, isLargeDesktop } = useResponsive()

    // Determine columns based on screen size
    const getColumns = () => {
        if (isMobile) return maxColumns.xs || 1
        if (isTablet) return maxColumns.sm || 2
        if (isDesktop) return maxColumns.md || 3
        if (isLargeDesktop) return maxColumns.lg || 4
        return maxColumns.md || 3
    }

    const columns = getColumns()

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: `repeat(${maxColumns.xs || 1}, 1fr)`,
                    sm: `repeat(${maxColumns.sm || 2}, 1fr)`,
                    md: `repeat(${maxColumns.md || 3}, 1fr)`,
                    lg: `repeat(${maxColumns.lg || 4}, 1fr)`
                },
                gap: spacing,
                width: '100%',
                // Fallback for browsers that don't support CSS Grid properly
                '@supports not (display: grid)': {
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > *': {
                        minWidth: minItemWidth,
                        flex: `1 1 calc(${100 / columns}% - ${spacing * 8}px)`
                    }
                },
                ...sx
            }}
            {...other}
        >
            {children}
        </Box>
    )
}

ResponsiveGrid.propTypes = {
    children: PropTypes.node.isRequired,
    spacing: PropTypes.number,
    minItemWidth: PropTypes.string,
    maxColumns: PropTypes.shape({
        xs: PropTypes.number,
        sm: PropTypes.number,
        md: PropTypes.number,
        lg: PropTypes.number
    }),
    sx: PropTypes.object
}

export default ResponsiveGrid
