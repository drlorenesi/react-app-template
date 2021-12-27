import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Enviado() {
  return (
    <>
      <div className='login-form'>
        <h2 className='text-center p-2'>!Listo ✅!</h2>
        <p className='text-center'>
          Se ha enviado un correo con instrucciones para restablecer tu
          contraseña.
        </p>
        <Link to='/login'>
          <div className='d-grid'>
            <Button variant='primary'>Regresar</Button>
          </div>
        </Link>
      </div>
    </>
  );
}
