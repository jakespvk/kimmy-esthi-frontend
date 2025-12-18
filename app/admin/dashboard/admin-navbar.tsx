import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminNavbar() {
  return (
    <div>
      <nav className="flex flex-wrap justify-center p-2 gap-2">
        <Button variant="outline" className="hover:bg-base-300"><Link href="#create-appointments">Create Appointments</Link></Button>
        <Button variant="outline" className="hover:bg-base-300"><Link type="button" href="#appointments-list">Appointments List</Link></Button>
        <Button variant="outline" className="hover:bg-base-300"><Link type="button" href="#edit-services">Edit Services</Link></Button>
      </nav>
    </div>
  )
}

