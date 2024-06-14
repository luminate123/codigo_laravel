"use client"
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Tallereslayout({ children }: { children: React.ReactNode }) {


    const pathname = usePathname()
    return <>
        <div>
            <Button as={Link} color="primary" href="/servicios/nuevoServicio" variant="flat">
                Crear Servicio
            </Button>
        </div>
        <nav>
            <Link href={'/servicios'} className={`text-2xl font-semibold ${pathname === '/servicios' ? 'text-red-600' : ''}`}  >Seccion Servicio</Link>

            <ul>
                <li>
                    <Link href={'/servicios/1'} className={`${pathname === '/servicios/1' ? 'text-blue-600' : ''}`}>Mantenimiento</Link>
                </li>
                <li>
                    <Link href={'/servicios/2'} className={`${pathname === '/servicios/2' ? 'text-blue-600' : ''}`}>Afinamiento</Link>
                </li>
                <li>
                    <Link href={'/servicios/3'} className={`${pathname === '/servicios/3' ? 'text-blue-600' : ''}`}>Cambio de Aceite</Link>
                </li>
                <li>
                    <Link href={'/servicios/4'} className={`${pathname === '/servicios/4' ? 'text-blue-600' : ''}`}>Lavado tipo salón</Link>
                </li>
            </ul>

        </nav>
        {children}

    </>
}