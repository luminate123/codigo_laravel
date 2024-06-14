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
      <div>
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button type="submit">Add Service</Button>
    </form>
  );
};

export default AddServiceForm;
