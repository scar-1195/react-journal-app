import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: '',
};

const formValidations = {
  email:       [value => value.includes('@'), 'El correo debe de tener una @'],
  password:    [value => value.length >= 6,   'El password debe de tener más de 6 letras.'],
  displayName: [value => value.length >= 1,   'El nombre es obligatorio.'],
};

export const RegisterPage = () => {
  
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  
  const isCheckingAuthentication = useMemo(() => status === 'checking',[status]);

  const {
    displayName,
    displayNameValid,
    email,
    emailValid,
    formState,
    isFormValid,
    onInputChange,
    password,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = event => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title='Crear cuenta'>
      <form
        onSubmit={onSubmit}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              error={!!displayNameValid && formSubmitted}
              fullWidth
              helperText={displayNameValid}
              label='Nombre completo'
              name='displayName'
              onChange={onInputChange}
              placeholder='Nombre completo'
              type='text'
              value={displayName}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              error={!!emailValid && formSubmitted}
              fullWidth
              helperText={emailValid}
              label='Correo'
              name='email'
              onChange={onInputChange}
              placeholder='correo@google.com'
              type='email'
              value={email}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              error={!!passwordValid && formSubmitted}
              fullWidth
              helperText={passwordValid}
              label='Contraseña'
              name='password'
              onChange={onInputChange}
              placeholder='Contraseña'
              type='password'
              value={password}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                fullWidth
                type='submit'
                variant='contained'
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
}
