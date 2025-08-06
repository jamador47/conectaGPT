import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Box
} from '@mui/material'
import moment from 'moment'
import axios from 'axios'
import { baseURL } from '@/store/constant'
import useTranslation from '@/hooks/useTranslation'
import conectaGPTLogo from '@/assets/images/conectaGPT.png'

const AboutDialog = ({ show, onCancel }) => {
    const portalElement = document.getElementById('portal')
    const { t } = useTranslation()

    const [data, setData] = useState({})

    useEffect(() => {
        if (show) {
            const latestReleaseReq = axios.get('https://api.github.com/repos/ConectaGPT/ConectaGPT/releases/latest')
            const currentVersionReq = axios.get(`${baseURL}/api/v1/version`, {
                withCredentials: true,
                headers: { 'Content-type': 'application/json', 'x-request-from': 'internal' }
            })

            Promise.all([latestReleaseReq, currentVersionReq])
                .then(([latestReleaseData, currentVersionData]) => {
                    const finalData = {
                        ...latestReleaseData.data,
                        currentVersion: currentVersionData.data.version
                    }
                    setData(finalData)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error)
                })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

    const component = show ? (
        <Dialog
            onClose={onCancel}
            open={show}
            fullWidth
            maxWidth='sm'
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ fontSize: '1rem', textAlign: 'center', pb: 1 }} id='alert-dialog-title'>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <img
                        src={conectaGPTLogo}
                        alt='ConectaGPT'
                        style={{
                            width: 120,
                            height: 'auto',
                            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                        }}
                    />
                    {t('app.name')} {t('labels.version')}
                </Box>
            </DialogTitle>
            <DialogContent>
                {data && (
                    <TableContainer component={Paper}>
                        <Table aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('labels.current_version')}</TableCell>
                                    <TableCell>{t('labels.latest_version')}</TableCell>
                                    <TableCell>{t('labels.published_at')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component='th' scope='row'>
                                        {data.currentVersion}
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        <a target='_blank' rel='noreferrer' href={data.html_url}>
                                            {data.name}
                                        </a>
                                    </TableCell>
                                    <TableCell>{moment(data.published_at).fromNow()}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

AboutDialog.propTypes = {
    show: PropTypes.bool,
    onCancel: PropTypes.func
}

export default AboutDialog
