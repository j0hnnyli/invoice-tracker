export default function StepSections(){
  return (
    <section className="py-10 max_width mx-auto my-10 px-5 lg:px-0 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Left: Text Content */}
      <div className="w-full md:w-1/2 text-white">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          See Invoice Tracker in Action
        </h2>
        <p className="text-lg mb-6 text-white/80">
          Watch how easily you can create, send, and manage invoices in just a few clicks.
          This quick walkthrough highlights all the key features built to save you time.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2">
          <li>Send client-ready invoices</li>
          <li>Track open and paid invoices in your dashboard</li>
          <li>Email reminders </li>
        </ul>
      </div>

      {/* Right: Video or Placeholder */}
      <div className="w-full md:w-1/2">
        <div className="h-[400px] w-full rounded-lg overflow-hidden bg-gray-300">
        </div>
      </div>
    </section>
  )
}