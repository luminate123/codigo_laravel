"use client"
import { Button } from '@nextui-org/react';
import { useState } from 'react';

const AddServiceForm = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo, descripcion }),
    });

    if (response.ok) {
      // Clear form and reset state
      setTitulo('');
      setDescripcion('');
      setError('');
      // Handle successful response, e.g., show a success message
    } else {
      const errorData = await response.json();
      setError(errorData.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="Titule" className="block text-sm font-medium leading-6 text-gray-900">
            Titulo
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="Titule"
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
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Descripción
          </label>
          <div className="mt-2">
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              name="description"
              rows={1}
              className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Mantenimiento de vehículos a gasolina y diésel."
            />
          </div>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button type="submit">Add Service</Button>
    </form>
  );
};

export default AddServiceForm;
