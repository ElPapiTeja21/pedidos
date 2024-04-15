import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import 'alertifyjs/build/css/alertify.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { dbFirebase } from '../../shared/connection/Connection';
import { collection, addDoc } from "firebase/firestore";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  _component: any;
  optionMenu: string;
}

export default function ResponsiveDrawer(props: Props) {
  const { window, _component, optionMenu } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [getAlert, setAlert] = useState<boolean>(false)
  const [getAlert2, setAlert2] = useState<boolean>(false)
  const [getForm, setForm] = useState<boolean>(false)
  const [getBtn, setBtn] = useState<boolean>(true)
  const navigate = useNavigate();

  const [showItems, setShowItems] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const toggleItems = () => {
    setShowItems(!showItems);
  };
  const handleNextOptionsClick = () => {
    setShowMoreOptions(true);
  };

  const handlePreviousOptionsClick = () => {
    setShowMoreOptions(false);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const [getCar, setCar] = useState<any[]>([])

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [getTotal, setTotal] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  useEffect(() => {
    setInterval(() => {
      const car = sessionStorage.getItem('car')
      let obj: any[] = car ? JSON.parse(car || '') : []
      let total = 0
      obj.forEach((item) => {
        total += item.valor_compra
      })
      setTotal(total)
      setCar(obj)
    }, 100)
  }, [sessionStorage.getItem('car')])

  useEffect(() => { if (getAlert) setTimeout(() => { setAlert(false) }, 3000); }, [getAlert])

  const eliminar = (obj: any) => {
    const car = sessionStorage.getItem('car')
    let obj3: any[] = car ? JSON.parse(car || '') : []
    obj3 = obj3.filter(data => data?.idProduct !== obj?.idProduct)
    setCar(obj3)
    sessionStorage.setItem('car', JSON.stringify(obj3))
    setAlert(true)
  }

  const login = () => {
    navigate("/dashboard");
  }
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {optionMenu == 'user' && (<List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClickOpen2}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={'Usuario'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
              <ShoppingCartIcon /><strong className='color-standar'>{getCar.length}</strong>
            </ListItemIcon>
            <ListItemText primary={'Carrito'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
        <Button onClick={toggleItems}>Restaurante</Button>
      </ListItem>
      {showItems && (
        <>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/products")}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={'Qbano'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/products2")}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={'Burguer Master'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/products3")}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={'King Papa'} />
            </ListItemButton>
          </ListItem>
          {!showMoreOptions && (
            <ListItem disablePadding>
              <Button onClick={handleNextOptionsClick}>Mas</Button>
            </ListItem>
          )}
        </>
      )}
      {showMoreOptions && (
        <>
          {/* Agrega aquí las opciones adicionales que quieres mostrar */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/products4")}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={'Chicken Wings'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/products5")}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={'Gaón Artesanal'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <Button onClick={handlePreviousOptionsClick}>Menos</Button>
          </ListItem>
        </>
      )}
      </List>)}

      {optionMenu == 'admin' && (<List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/products")}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={'Cerrar Sesión'} />
          </ListItemButton>
        </ListItem>
      </List>)
      }

      <Divider />
      <List>
      </List>
    </div >
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {optionMenu == 'user' && (<Typography variant="h6" noWrap component="div">
            ColoFood: Comidas rapidas para tu hogar.
          </Typography>)}
          {optionMenu == 'admin' && (<Typography variant="h6" noWrap component="div">
            Dashboard admin
          </Typography>)}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {_component}
      </Box>



      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          className='modal-car'
        >

          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <strong>Crea tu cuenta</strong>
          </DialogTitle>

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          {!getForm ? (<>
            <DialogContent dividers>
              <div className='table-responsive'>
                <strong>Total compra: </strong>{getTotal}
                <table style={{ width: '900px' }}>
                  <thead>
                    <tr><td className='col-td-title'></td>
                      <td className='col-td-title'><strong>Producto</strong></td>
                      <td className='col-td-title'><strong>Cantidad</strong></td>
                      <td className='col-td-title'><strong>Valor</strong></td>
                    </tr>
                  </thead>
                  {getCar && (
                    getCar?.map((produc, index) =>
                      <tbody key={index}>
                        <tr>
                          <td className='col-td'><img src={produc?.img_plato} width={80} alt="" /></td>
                          <td className='col-td'>{produc?.nombre_plato}</td>
                          <td className='col-td'>{produc?.valor_compra / produc?.precio}</td>
                          <td className='col-td'>{produc?.valor_compra}</td>
                          <td className='col-td'>
                            <Button variant="outlined" onClick={() => eliminar(produc)} startIcon={<DeleteIcon />}>
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    )
                  )}
                </table>

                {getAlert && (<Alert severity="success">
                  <AlertTitle>Exito</AlertTitle>
                  Eliminación exitosa.
                </Alert>)}

              </div>
            </DialogContent>
          </>) : (
            <>
              <DialogContent dividers>

                <Formik
                  validationSchema={Yup.object({
                    nombres: Yup.string().required('⚠️ Por favor ingrese el Nombre(s)'),
                    apellidos: Yup.string().required('⚠️ Por favor ingrese el Apellido(s)'),
                    telefono: Yup.string().required('⚠️ Por favor ingrese el Telefono'),
                    metodo_pago: Yup.string().required('⚠️ Por favor ingrese el Metodo de pago'),
                    barrio: Yup.string().required('⚠️ Por favor ingrese el Barrio'),
                    direccion: Yup.string().required('⚠️ Por favor ingrese el Dirección'),
                    email: Yup.string().email('⚠️ Email invalido').required('⚠️ Por favor ingrese el Email')
                  })}
                  initialValues={{
                    nombres: '',
                    apellidos: '',
                    telefono: '',
                    metodo_pago: '',
                    barrio: '',
                    direccion: '',
                    email: ''
                  }}

                  onSubmit={async (values) => {
                    setBtn(true)
                    try {
                      const docRef = await addDoc(collection(dbFirebase, "pedidos"), values);
                      getCar.forEach(async data => {
                        data['idPedidos'] = docRef.id;
                        console.log(data);
                        await addDoc(collection(dbFirebase, "productos"), data);
                      })
                      values.nombres = ''
                      values.apellidos = ''
                      values.telefono = ''
                      values.metodo_pago = ''
                      values.barrio = ''
                      values.direccion = ''
                      values.email = ''
                      sessionStorage.removeItem('car')
                      setAlert2(true)
                      setTimeout(() => {
                        setAlert2(false)
                      }, 4000);
                    } catch (e) {
                      console.error("Error adding document: ", e);
                    }
                  }}>
                  {props => {
                    let { values, errors, handleChange, handleSubmit, isValid } = props;
                    return (
                      <>
                        <Form onSubmit={handleSubmit} autoComplete='off'>
                          <Grid container spacing={2}>
                            {getAlert2 && (<>
                              <Alert severity="success">
                                <AlertTitle>Exito</AlertTitle>
                                Pedido creado.
                              </Alert></>)}
                            <Grid item xs={12} md={6} sm={6}>
                              <TextField id="outlined-basic" label="Nombre(s)" variant="outlined"
                                error={errors.nombres ? true : false}
                                style={{ width: '100%' }}
                                name="nombres" placeholder="Ej: Andres"
                                onChange={handleChange}
                                value={values.nombres} />
                              {errors.nombres ? (<span className="textErrID">{errors.nombres}</span>) : null}
                            </Grid>
                            <Grid item xs={12} md={6} sm={6}>
                              <TextField id="outlined-basic" label="Apellido(s)" variant="outlined"
                                error={errors.apellidos ? true : false}
                                style={{ width: '100%' }}
                                name="apellidos" placeholder="Ej: Prada"
                                onChange={handleChange}
                                value={values.apellidos} />
                              {errors.apellidos ? (<span className="textErrID">{errors.apellidos}</span>) : null}
                            </Grid>
                            <Grid item xs={12} md={6} sm={6}>
                              <TextField id="outlined-basic" label="Telefono" variant="outlined"
                                error={errors.telefono ? true : false}
                                type='tel'
                                style={{ width: '100%' }}
                                name="telefono" placeholder="Ej: 324987433"
                                onChange={handleChange}
                                value={values.telefono} />
                              {errors.telefono ? (<span className="textErrID">{errors.telefono}</span>) : null}
                            </Grid>
                            <Grid item xs={12} md={6} sm={6}>
                              <FormControl fullWidth>
                                <InputLabel id="metodo_pago">Metodo de pago</InputLabel>
                                <Select
                                  error={errors.metodo_pago ? true : false}
                                  style={{ width: '100%' }}
                                  labelId="metodo_pago"
                                  name="metodo_pago"
                                  value={values.metodo_pago}
                                  label="Metodo de pago"
                                  onChange={handleChange}>
                                  <MenuItem value={'efectivo'}>Efectivo</MenuItem>
                                  <MenuItem value={'transferencia'}>Transferencia</MenuItem>
                                </Select>
                                {errors.metodo_pago ? (<span className="textErrID">{errors.metodo_pago}</span>) : null}
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6} sm={6}>
                              <TextField id="outlined-basic" label="Barrio" variant="outlined"
                                error={errors.barrio ? true : false}
                                style={{ width: '100%' }}
                                name="barrio" placeholder="Ej: Caney"
                                onChange={handleChange}
                                value={values.barrio} />
                              {errors.barrio ? (<span className="textErrID">{errors.barrio}</span>) : null}
                            </Grid>
                            <Grid item xs={12} md={6} sm={6}>
                              <TextField id="outlined-basic" label="Dirección" variant="outlined"
                                error={errors.direccion ? true : false}
                                style={{ width: '100%' }}
                                name="direccion" placeholder="Ej: Cra. 34#23-45"
                                onChange={handleChange}
                                value={values.direccion} />
                              {errors.direccion ? (<span className="textErrID">{errors.direccion}</span>) : null}
                            </Grid>
                            <Grid item xs={12} md={6} sm={6}>
                              <TextField id="outlined-basic" label="Email" variant="outlined"
                                error={errors.email ? true : false}
                                type='email'
                                style={{ width: '100%' }}
                                name="email" placeholder="Ej: ejemplo@gmail.com"
                                onChange={handleChange}
                                value={values.email} />
                              {errors.email ? (<span className="textErrID">{errors.email}</span>) : null}
                            </Grid>
                          </Grid>
                          <button type="submit" hidden id="btn-pedido">Submit</button>

                          <DialogActions>
                          <Button disabled={!isValid} onClick={() => document.getElementById('btn-pedido')?.click()} variant="contained">
                              Ya tengo cuenta
                            </Button>
                            <Button disabled={!isValid} onClick={() => document.getElementById('btn-pedido')?.click()} variant="contained" endIcon={<SendIcon />}>
                              Crear Orden
                            </Button>
                          </DialogActions>
                        </Form>

                      </>
                    )
                  }}
                </Formik>
              </DialogContent>
            </>
          )}
          {!getForm && (
            <DialogActions>

              <Button onClick={() => setForm(true)} variant="contained" endIcon={<SendIcon />}>
                Realizar pedido
              </Button>
            </DialogActions>
          )}
        </BootstrapDialog>
      </React.Fragment>





      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose2}
          aria-labelledby="customized-dialog-title"
          open={open2}
          className='modal-car'
        >

          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <strong>Login</strong>
          </DialogTitle>

          <IconButton
            aria-label="close"
            onClick={handleClose2}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent dividers>

            <Formik
              validationSchema={Yup.object({
                usuario: Yup.string().email('⚠️ Usuario invalido').required('⚠️ Por favor ingrese el Usuario'),
                pass: Yup.string().required('⚠️ Por favor ingrese la Contraseña')
              })}
              initialValues={{
                usuario: '',
                pass: '',
                error: false
              }}

              onSubmit={(values) => {
                if (values.usuario == 'admin@gmail.com' && values.pass == '123456') {
                  values.error = false;
                  login()
                } else {
                  values.error = true
                }
              }}>
              {props => {
                let { values, errors, handleChange, handleSubmit, isValid } = props;
                return (
                  <Form onSubmit={handleSubmit} autoComplete='off'>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4} sm={4}></Grid>
                      <Grid item xs={12} md={4} sm={4}>
                        <TextField id="outlined-basic" label="Usuario" variant="outlined"
                          error={errors.usuario ? true : false}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                          }}
                          style={{ width: '100%' }}
                          name="usuario" placeholder="Ej: exemplo@gmail.com"
                          onChange={handleChange}
                          value={values.usuario} />
                        {errors.usuario ? (<span className="textErrID">{errors.usuario}</span>) : null}
                        <br /><br />
                        <TextField id="pass" label="Contraseña" variant="outlined"
                          type='password'
                          error={errors.pass ? true : false}
                          style={{ width: '100%' }}
                          name="pass" placeholder="Ej: *********"
                          onChange={handleChange}
                          value={values.pass} />
                        {errors.pass ? (<span className="textErrID">{errors.pass}</span>) : null}
                      </Grid>
                      <Grid item xs={12} md={4} sm={4}></Grid>
                    </Grid>
                    <button type="submit" hidden id="btn-login2">Submit</button>
                    {values.error && (
                      <div className="alert alert-danger">
                        <p></p>
                        Usuario o contraseña incorrecta
                      </div>
                    )}
                  </Form>
                )
              }}
            </Formik>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => { document.getElementById('btn-login2')?.click() }} variant="contained">
              Iniciar sesión
            </Button>
          </DialogActions>

        </BootstrapDialog>
      </React.Fragment>

    </Box >





  );
}