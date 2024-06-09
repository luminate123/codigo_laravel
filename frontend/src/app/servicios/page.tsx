"use client"
import React from 'react'
import { useEffect, useState } from 'react';
function TalleresPage() {
  const [services, setServices] = useState<{ id: number; titulo: string; }[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/services')
      .then(response => response.json())
      .then(data => {
        setServices(data);

      });
  }, []);
  return (

    <div className='grid justify-items-center text-2xl font-semibold'>
      <div className='text-4xl'>Servicios Page 
        <ul>
          {services.map(services => (
            <li key={services.id} className='text-base'> {services.titulo}</li>
          ))}
        </ul>
      </div>

    </div>


  )
}

export default TalleresPage