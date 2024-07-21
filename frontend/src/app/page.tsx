"use client"
import { signIn, useSession } from "next-auth/react";
function InicioPage() {
  const { data: session } = useSession()
  return (
    <div>
      {
        session?.user ? <div>
        
        logueado, disfrute
        
        </div> : <div>
          Debe loguearse con google para acceder a los links
        </div>
      }
    </div>


  )
}

export default InicioPage