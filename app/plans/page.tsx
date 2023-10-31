import Nav from "@/components/Nav";

function Page() {
  return (
    <div className="h-screen flex flex-col items-center space-y-8 bg-secondary">
      <Nav />
      <div className="flex space-x-6">
        <div className="bg-black px-12 py-10 opacity-90 flex flex-col text-center w-1/2 space-y-2 hover:scale-105">
          <h1 className="text-primary text-2xl uppercase pb-8">VIP Plan</h1>
          <h1 className="text-accent pb-4 text-2xl border-b-2 border-secondary">
            ₹100 per month
          </h1>
          <p className="text-secondary pt-2 pb-10">
            Access to all VIP and Free Articles
          </p>
          <button className="bg-primary mx-4 py-2 hover:bg-black hover:border-primary border-2 hover:text-primary border-black">
            Proceed
          </button>
        </div>
        <div className="bg-black px-12 py-10 opacity-90 flex flex-col text-center w-1/2 space-y-2 scale-105 hover:scale-110">
          <h1 className="text-primary text-2xl uppercase pb-9">Premium Plan</h1>
          <h1 className="text-accent text-2xl border-b-2 border-secondary pb-4">
            ₹200 per month
          </h1>
          <p className="text-secondary pt-2 pb-3">
            Access to all Premium ,VIP and Free Articles
          </p>
          <button className="bg-primary mx-4 py-2 hover:bg-black hover:border-primary border-2 hover:text-primary border-black">
            Proceed
          </button>
        </div>
        <div className="bg-black px-12 py-10 opacity-90 flex flex-col text-center w-1/2 space-y-2 hover:scale-105">
          <h1 className="text-primary text-2xl uppercase pb-8">Free Plan</h1>
          <h1 className="text-accent text-2xl uppercase pb-4 border-b-2 border-secondary ">
            FREE
          </h1>
          <p className="text-secondary pt-2 pb-10">
            Access to all Free Articles
          </p>
          <button className="bg-primary mx-4 py-2 hover:bg-black hover:border-primary border-2 hover:text-primary border-black">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
