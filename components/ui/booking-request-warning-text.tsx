export default function BookingRequestWarningText() {
  return (
    <div className="md:flex flex-col justify-center items-center text-lg font-bold mx-5 text-red-700">
      <p>Selecting a date and time sends a request, not a confirmed appointment.</p>
      <p className="pt-1 pb-5">You’ll receive a message or email once your booking has been approved.</p>
    </div>
  )
}

