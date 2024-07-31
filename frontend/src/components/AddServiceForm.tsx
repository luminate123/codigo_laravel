"use client"
import { Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from "next/navigation";

const ServiceForm = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const isUpdate = pathname.includes('actualizarServicio');
  const serviceId = pathname.split('/').pop(); // Obtener el ID del servicio de la URL

  useEffect(() => {
    if (isUpdate && serviceId) {
      // Fetch existing service data and set it to state
      const fetchService = async () => {
        const response = await fetch(`http://localhost:3000/api/services/${serviceId}`);
        if (response.ok) {
          const data = await response.json();
          setTitulo(data.titulo);
          setDescripcion(data.descripcion);
        } else {
          setError('Failed to fetch service data.');
        }
      };

      fetchService();
    }
  }, [isUpdate, serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isUpdate ? `http://localhost:3000/api/services/${serviceId}` : 'http://localhost:3000/api/services';
    const method = isUpdate ? 'PATCH' : 'POST';
    const updatedAt = new Date().toISOString(); // Obtener la hora actual en formato ISO

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('updated_at', updatedAt);
    if (file) {
      formData.append('image', file);
    }

    const response = await fetch(url, {
      method,
      body: formData,
    });

    if (response.ok) {
      // Clear form and reset state
      setTitulo('');
      setDescripcion('');
      setFile(null);
      setError('');
      // Redirigir a la página de servicios
      router.push('/servicios');
      // Refrescar la página después de un pequeño retraso
      setTimeout(() => {
        window.location.reload();
      }, 500); // Ajusta el retraso según sea necesario
    } else {
      const errorData = await response.json();
      setError(errorData.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="titulo" className="block text-sm font-medium leading-6 text-gray-900">
            Titulo
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="titulo"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Mantenimiento"
              />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
            Descripción
          </label>
          <div className="mt-2">
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              name="descripcion"
              rows={1}
              className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Mantenimiento de vehículos a gasolina y diésel."
            />
          </div>
        </div>
        <div className="col-span-full">
          <label htmlFor="file" className="block text-sm font-medium leading-6 text-gray-900">
            Imagen
          </label>
          <div className="mt-2">
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              accept="image/*" // Add accept attribute to only allow image files
              className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button type="submit">{isUpdate ? 'Update Service' : 'Add Service'}</Button>
    </form>
  );
};

export default ServiceForm;
