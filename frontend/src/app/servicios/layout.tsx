"use client"
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Tallereslayout({ children }: { children: React.ReactNode }) {

    const [services, setServices] = useState<{ id: number; titulo: string; }[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/services')
            .then(response => response.json())
            .then(data => {
                setServices(data);

            });
    }, []);

    const pathname = usePathname()
    return <>
        <div>
            <Button as={Link} color="primary" href="/servicios/nuevoServicio" variant="flat">
                Crear Servicio
            </Button>
        </div>

        <div className=' text-2xl '>
            <div className='text-4xl font-semibold'>Servicios Page</div>
            <nav>

                <ul>
                    {services.map(services => (
                        <li>
                            <Link href={`/servicios/${services.id}`} className={`${pathname === `/servicios/${services.id}` ? 'text-blue-600' : ''}`}>{services.titulo}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

        </div>

        <div className="grid justify-items-center">
            {children}
        </div>

    </>
}