import Nav from "./Nav";

function Loading() {
  return (
    <div className="bg-black h-screen opacity-[85%] flex flex-col space-y-[12vh] w-screen items-center">
      <Nav />
      <h1 className="text-primary text-4xl ">Loading...</h1>
    </div>
  );
}

export default Loading;
