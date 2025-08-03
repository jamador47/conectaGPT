import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { enqueueSnackbar as enqueueSnackbarAction, closeSnackbar as closeSnackbarAction } from '@/store/actions'

// Material
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, OutlinedInput } from '@mui/material'

// Project imports
import { StyledButton } from '@/ui-component/button/StyledButton'
import ConfirmDialog from '@/ui-component/dialog/ConfirmDialog'

// Icons
import { IconX, IconVariable } from '@tabler/icons-react'

// API
import variablesApi from '@/api/variables'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

// utils
import useNotifier from '@/utils/useNotifier'

// const
import { HIDE_CANVAS_DIALOG, SHOW_CANVAS_DIALOG } from '@/store/actions'
import { Dropdown } from '@/ui-component/dropdown/Dropdown'

const getVariableTypes = (t) => [
    {
        label: t('variables.types.static'),
        name: 'static',
        description: t('variables.types.static_description')
    },
    {
        label: t('variables.types.runtime'),
        name: 'runtime',
        description: t('variables.types.runtime_description')
    }
]

const AddEditVariableDialog = ({ show, dialogProps, onCancel, onConfirm, setError }) => {
    const portalElement = document.getElementById('portal')
    const { t } = useTranslation()

    const dispatch = useDispatch()

    // ==============================|| Snackbar ||============================== //

    useNotifier()

    const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args))
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args))

    const [variableName, setVariableName] = useState('')
    const [variableValue, setVariableValue] = useState('')
    const [variableType, setVariableType] = useState('static')
    const [dialogType, setDialogType] = useState('ADD')
    const [variable, setVariable] = useState({})

    useEffect(() => {
        if (dialogProps.type === 'EDIT' && dialogProps.data) {
            setVariableName(dialogProps.data.name)
            setVariableValue(dialogProps.data.value)
            setVariableType(dialogProps.data.type)
            setDialogType('EDIT')
            setVariable(dialogProps.data)
        } else if (dialogProps.type === 'ADD') {
            setVariableName('')
            setVariableValue('')
            setVariableType('static')
            setDialogType('ADD')
            setVariable({})
        }

        return () => {
            setVariableName('')
            setVariableValue('')
            setVariableType('static')
            setDialogType('ADD')
            setVariable({})
        }
    }, [dialogProps])

    useEffect(() => {
        if (show) dispatch({ type: SHOW_CANVAS_DIALOG })
        else dispatch({ type: HIDE_CANVAS_DIALOG })
        return () => dispatch({ type: HIDE_CANVAS_DIALOG })
    }, [show, dispatch])

    const addNewVariable = async () => {
        try {
            const obj = {
                name: variableName,
                value: variableValue,
                type: variableType
            }
            const createResp = await variablesApi.createVariable(obj)
            if (createResp.data) {
                enqueueSnackbar({
                    message: t('variables.messages.added_success'),
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success',
                        action: (key) => (
                            <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                                <IconX />
                            </Button>
                        )
                    }
                })
                onConfirm(createResp.data.id)
            }
        } catch (err) {
            if (setError) setError(err)
            enqueueSnackbar({
                message: t('variables.messages.add_error', {
                    error: typeof err.response.data === 'object' ? err.response.data.message : err.response.data
                }),
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'error',
                    persist: true,
                    action: (key) => (
                        <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                            <IconX />
                        </Button>
                    )
                }
            })
            onCancel()
        }
    }

    const saveVariable = async () => {
        try {
            const saveObj = {
                name: variableName,
                value: variableValue,
                type: variableType
            }

            const saveResp = await variablesApi.updateVariable(variable.id, saveObj)
            if (saveResp.data) {
                enqueueSnackbar({
                    message: t('variables.messages.saved_success'),
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success',
                        action: (key) => (
                            <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                                <IconX />
                            </Button>
                        )
                    }
                })
                onConfirm(saveResp.data.id)
            }
        } catch (err) {
            if (setError) setError(err)
            enqueueSnackbar({
                message: t('variables.messages.save_error', {
                    error: typeof err.response.data === 'object' ? err.response.data.message : err.response.data
                }),
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'error',
                    persist: true,
                    action: (key) => (
                        <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                            <IconX />
                        </Button>
                    )
                }
            })
            onCancel()
        }
    }

    const component = show ? (
        <Dialog
            fullWidth
            maxWidth='sm'
            open={show}
            onClose={onCancel}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <IconVariable style={{ marginRight: '10px' }} />
                    {dialogProps.type === 'ADD' ? t('variables.add_variable') : t('variables.edit_variable')}
                </div>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ p: 2 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography>
                            {t('variables.name')}<span style={{ color: 'red' }}>&nbsp;*</span>
                        </Typography>

                        <div style={{ flexGrow: 1 }}></div>
                    </div>
                    <OutlinedInput
                        size='small'
                        sx={{ mt: 1 }}
                        type='string'
                        fullWidth
                        key='variableName'
                        onChange={(e) => setVariableName(e.target.value)}
                        value={variableName ?? ''}
                        id='txtInput_variableName'
                    />
                </Box>
                <Box sx={{ p: 2 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography>
                            {t('variables.type')}<span style={{ color: 'red' }}>&nbsp;*</span>
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                    </div>
                    <Dropdown
                        key={variableType}
                        name='variableType'
                        options={getVariableTypes(t)}
                        onSelect={(newValue) => setVariableType(newValue)}
                        value={variableType ?? t('variables.choose_option')}
                        id='dropdown_variableType'
                    />
                </Box>
                {variableType === 'static' && (
                    <Box sx={{ p: 2 }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography>
                                {t('variables.value')}<span style={{ color: 'red' }}>&nbsp;*</span>
                            </Typography>
                            <div style={{ flexGrow: 1 }}></div>
                        </div>
                        <OutlinedInput
                            size='small'
                            sx={{ mt: 1 }}
                            type='string'
                            fullWidth
                            key='variableValue'
                            onChange={(e) => setVariableValue(e.target.value)}
                            value={variableValue ?? ''}
                            id='txtInput_variableValue'
                        />
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <StyledButton
                    disabled={!variableName || !variableType || (variableType === 'static' && !variableValue)}
                    variant='contained'
                    onClick={() => (dialogType === 'ADD' ? addNewVariable() : saveVariable())}
                    id='btn_confirmAddingNewVariable'
                >
                    {dialogProps.confirmButtonName}
                </StyledButton>
            </DialogActions>
            <ConfirmDialog />
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

AddEditVariableDialog.propTypes = {
    show: PropTypes.bool,
    dialogProps: PropTypes.object,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    setError: PropTypes.func
}

export default AddEditVariableDialog
