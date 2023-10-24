
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
      <div className=" flex flex-col justify-center items-center w-full gap-4">
        <h1 className=" text-xl font-bold ">GoodCopBadCop</h1>
        <a href="/post" className=" px-4 py-2 mx-5 font-bold bg-blue-500 rounded-lg">Add Station</a>
        <a href="/complain" className=" px-4 py-2 mx-5 font-bold bg-blue-500 rounded-lg">Complain</a>
        

      </div>
    </main>
  )
}
