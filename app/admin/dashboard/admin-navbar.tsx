import { Button } from "@/components/ui/button";

export default function AdminNavbar() {
  function scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="sticky top-0 z-10">
      <nav className="relative flex flex-wrap justify-center p-2 gap-2 *:bg-base-200 *:hover:bg-base-300 *:scroll-mt-4">
        <Button variant="outline" onClick={() => scrollToElement("create-appointments")}>Create Appointments</Button>
        <Button variant="outline" onClick={() => scrollToElement("appointments-list")}>Appointments List</Button>
        <Button variant="outline" onClick={() => scrollToElement("edit-services")}>Edit Services</Button>
        <Button variant="outline" onClick={() => scrollToElement("consent-form")}>Edit Consent Form</Button>
      </nav>
    </div>
  )
}
































