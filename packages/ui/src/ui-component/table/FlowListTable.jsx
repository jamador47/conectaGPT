import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { styled } from '@mui/material/styles'
import {
    Box,
    Chip,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography,
    useTheme,
    useMediaQuery
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import FlowListMenu from '../button/FlowListMenu'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

import MoreItemsTooltip from '../tooltip/MoreItemsTooltip'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderColor: theme.palette.grey[900] + 25,

    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.grey[900]
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        height: 64
    }
}))

const StyledTableRow = styled(TableRow)(() => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}))

const getLocalStorageKeyName = (name, isAgentCanvas) => {
    return (isAgentCanvas ? 'agentcanvas' : 'chatflowcanvas') + '_' + name
}

export const FlowListTable = ({
    data,
    images = {},
    icons = {},
    isLoading,
    filterFunction,
    updateFlowsApi,
    setError,
    isAgentCanvas,
    isAgentflowV2
}) => {
    const { hasPermission } = useAuth()
    const isActionsAvailable = isAgentCanvas
        ? hasPermission('agentflows:update,agentflows:delete,agentflows:config,agentflows:domains,templates:flowexport,agentflows:export')
        : hasPermission('chatflows:update,chatflows:delete,chatflows:config,chatflows:domains,templates:flowexport,chatflows:export')
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))
    const customization = useSelector((state) => state.customization)

    const localStorageKeyOrder = getLocalStorageKeyName('order', isAgentCanvas)
    const localStorageKeyOrderBy = getLocalStorageKeyName('orderBy', isAgentCanvas)

    const [order, setOrder] = useState(localStorage.getItem(localStorageKeyOrder) || 'desc')
    const [orderBy, setOrderBy] = useState(localStorage.getItem(localStorageKeyOrderBy) || 'updatedDate')

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc'
        const newOrder = isAsc ? 'desc' : 'asc'
        setOrder(newOrder)
        setOrderBy(property)
        localStorage.setItem(localStorageKeyOrder, newOrder)
        localStorage.setItem(localStorageKeyOrderBy, property)
    }

    const onFlowClick = (row) => {
        if (!isAgentCanvas) {
            return `/canvas/${row.id}`
        } else {
            return isAgentflowV2 ? `/v2/agentcanvas/${row.id}` : `/agentcanvas/${row.id}`
        }
    }

    const sortedData = data
        ? [...data].sort((a, b) => {
              if (orderBy === 'name') {
                  return order === 'asc' ? (a.name || '').localeCompare(b.name || '') : (b.name || '').localeCompare(a.name || '')
              } else if (orderBy === 'updatedDate') {
                  return order === 'asc'
                      ? new Date(a.updatedDate) - new Date(b.updatedDate)
                      : new Date(b.updatedDate) - new Date(a.updatedDate)
              }
              return 0
          })
        : []

    return (
        <>
            <TableContainer
                sx={{
                    border: 1,
                    borderColor: theme.palette.grey[900] + 25,
                    borderRadius: 2,
                    overflowX: 'auto'
                }}
                component={Paper}
            >
                <Table
                    sx={{
                        minWidth: { xs: 300, sm: 500, md: 650 },
                        '& .MuiTableCell-root': {
                            px: { xs: 1, sm: 2 },
                            py: { xs: 1, sm: 1.5 }
                        }
                    }}
                    size={isMobile ? 'small' : 'medium'}
                    aria-label='responsive table'
                >
                    <TableHead
                        sx={{
                            backgroundColor: customization.isDarkMode ? theme.palette.common.black : theme.palette.grey[100],
                            height: 56
                        }}
                    >
                        <TableRow>
                            <StyledTableCell
                                component='th'
                                scope='row'
                                sx={{
                                    width: { xs: '40%', sm: '30%', md: '20%' },
                                    minWidth: '120px'
                                }}
                                key='0'
                            >
                                <TableSortLabel active={orderBy === 'name'} direction={order} onClick={() => handleRequestSort('name')}>
                                    Name
                                </TableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{
                                    width: { xs: '30%', sm: '25%', md: '25%' },
                                    display: { xs: 'none', sm: 'table-cell' }
                                }}
                                key='1'
                            >
                                Category
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{
                                    width: { xs: '30%', sm: '30%', md: '30%' },
                                    display: { xs: 'none', md: 'table-cell' }
                                }}
                                key='2'
                            >
                                Nodes
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{
                                    width: { xs: '30%', sm: '25%', md: '15%' },
                                    minWidth: '100px'
                                }}
                                key='3'
                            >
                                <TableSortLabel
                                    active={orderBy === 'updatedDate'}
                                    direction={order}
                                    onClick={() => handleRequestSort('updatedDate')}
                                >
                                    Last Modified Date
                                </TableSortLabel>
                            </StyledTableCell>
                            {isActionsAvailable && (
                                <StyledTableCell
                                    sx={{
                                        width: { xs: 'auto', sm: '15%', md: '10%' },
                                        minWidth: '80px'
                                    }}
                                    key='4'
                                >
                                    Actions
                                </StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <>
                                <StyledTableRow>
                                    <StyledTableCell>
                                        <Skeleton variant='text' />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant='text' />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant='text' />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant='text' />
                                    </StyledTableCell>
                                    {isActionsAvailable && (
                                        <StyledTableCell>
                                            <Skeleton variant='text' />
                                        </StyledTableCell>
                                    )}
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell>
                                        <Skeleton variant='text' />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant='text' />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant='text' />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant='text' />
                                    </StyledTableCell>
                                    {isActionsAvailable && (
                                        <StyledTableCell>
                                            <Skeleton variant='text' />
                                        </StyledTableCell>
                                    )}
                                </StyledTableRow>
                            </>
                        ) : (
                            <>
                                {sortedData.filter(filterFunction).map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell
                                            key='0'
                                            sx={{
                                                minWidth: '120px'
                                            }}
                                        >
                                            <Tooltip title={row.templateName || row.name}>
                                                <Typography
                                                    sx={{
                                                        display: '-webkit-box',
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    <Link to={onFlowClick(row)} style={{ color: '#2196f3', textDecoration: 'none' }}>
                                                        {row.templateName || row.name}
                                                    </Link>
                                                </Typography>
                                            </Tooltip>
                                        </StyledTableCell>
                                        <StyledTableCell
                                            key='1'
                                            sx={{
                                                display: { xs: 'none', sm: 'table-cell' }
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                    marginTop: 5
                                                }}
                                            >
                                                &nbsp;
                                                {row.category &&
                                                    row.category
                                                        .split(';')
                                                        .map((tag, index) => (
                                                            <Chip key={index} label={tag} style={{ marginRight: 5, marginBottom: 5 }} />
                                                        ))}
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell
                                            key='2'
                                            sx={{
                                                display: { xs: 'none', md: 'table-cell' }
                                            }}
                                        >
                                            {(images[row.id] || icons[row.id]) && (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'start',
                                                        gap: 1
                                                    }}
                                                >
                                                    {[
                                                        ...(images[row.id] || []).map((img) => ({
                                                            type: 'image',
                                                            src: img.imageSrc,
                                                            label: img.label
                                                        })),
                                                        ...(icons[row.id] || []).map((ic) => ({
                                                            type: 'icon',
                                                            icon: ic.icon,
                                                            color: ic.color,
                                                            title: ic.name
                                                        }))
                                                    ]
                                                        .slice(0, 5)
                                                        .map((item, index) => (
                                                            <Tooltip key={item.imageSrc || index} title={item.label} placement='top'>
                                                                {item.type === 'image' ? (
                                                                    <Box
                                                                        sx={{
                                                                            width: 30,
                                                                            height: 30,
                                                                            borderRadius: '50%',
                                                                            backgroundColor: customization.isDarkMode
                                                                                ? theme.palette.common.white
                                                                                : theme.palette.grey[300] + 75
                                                                        }}
                                                                    >
                                                                        <img
                                                                            style={{
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                padding: 5,
                                                                                objectFit: 'contain'
                                                                            }}
                                                                            alt=''
                                                                            src={item.src}
                                                                        />
                                                                    </Box>
                                                                ) : (
                                                                    <div
                                                                        style={{
                                                                            width: 30,
                                                                            height: 30,
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center'
                                                                        }}
                                                                    >
                                                                        <item.icon size={25} color={item.color} />
                                                                    </div>
                                                                )}
                                                            </Tooltip>
                                                        ))}

                                                    {(images[row.id]?.length || 0) + (icons[row.id]?.length || 0) > 5 && (
                                                        <MoreItemsTooltip
                                                            images={[
                                                                ...(images[row.id]?.slice(5) || []),
                                                                ...(
                                                                    icons[row.id]?.slice(Math.max(0, 5 - (images[row.id]?.length || 0))) ||
                                                                    []
                                                                ).map((ic) => ({ label: ic.name }))
                                                            ]}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    display: 'flex',
                                                                    fontSize: '.9rem',
                                                                    fontWeight: 200
                                                                }}
                                                            >
                                                                + {(images[row.id]?.length || 0) + (icons[row.id]?.length || 0) - 5} More
                                                            </Typography>
                                                        </MoreItemsTooltip>
                                                    )}
                                                </Box>
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            key='3'
                                            sx={{
                                                minWidth: '100px'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {isMobile
                                                    ? moment(row.updatedDate).format('MM/DD/YY')
                                                    : moment(row.updatedDate).format('MMMM Do, YYYY HH:mm:ss')}
                                            </Typography>
                                        </StyledTableCell>
                                        {isActionsAvailable && (
                                            <StyledTableCell
                                                key='4'
                                                sx={{
                                                    minWidth: '80px'
                                                }}
                                            >
                                                <Stack
                                                    direction={{ xs: 'column', sm: 'row' }}
                                                    spacing={1}
                                                    justifyContent='center'
                                                    alignItems='center'
                                                >
                                                    <FlowListMenu
                                                        isAgentCanvas={isAgentCanvas}
                                                        isAgentflowV2={isAgentflowV2}
                                                        chatflow={row}
                                                        setError={setError}
                                                        updateFlowsApi={updateFlowsApi}
                                                    />
                                                </Stack>
                                            </StyledTableCell>
                                        )}
                                    </StyledTableRow>
                                ))}
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

FlowListTable.propTypes = {
    data: PropTypes.array,
    images: PropTypes.object,
    icons: PropTypes.object,
    isLoading: PropTypes.bool,
    filterFunction: PropTypes.func,
    updateFlowsApi: PropTypes.object,
    setError: PropTypes.func,
    isAgentCanvas: PropTypes.bool,
    isAgentflowV2: PropTypes.bool
}
