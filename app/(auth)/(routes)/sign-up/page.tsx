import SchoolRegistrationForm from "./_components/school-register";


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <SchoolRegistrationForm />
      </div>
    </main>
  )
}

