import BotomDelete from "@/components/BotomDelete";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

async function load(id: any) {
    try {
        const res = await fetch(`http://localhost:3000/api/services/${id}`, { next: { revalidate: 0 } });
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        const data = await res.json();
        console.log('Fetched data:', data);
        return data;  // Return the fetched data
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;  // Return null in case of an error
    }
}


async function page({ params }: { params: { serviceId: number } }) {
    const service = await load(params.serviceId);

    if (!service) {
        return <div>Error: Unable to load service data.</div>;
    }
    return (
        <div key={service.id}>
            <p>id: {service.id}</p>
            <h1>Titulo: {service.titulo}</h1>
            <p>Description: {service.descripcion}</p>
            <p>Created at: {new Date(service.created_at).toLocaleString()}</p>
            <p>Updated at: {new Date(service.updated_at).toLocaleString()}</p>
            <Button as={Link} href={`/servicios/actualizarServicio/${service.id}`}>Actualizar Servicio</Button>
            <BotomDelete />
            
        </div>
    );
}

export default page;
