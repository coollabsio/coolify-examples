export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold pb-4">Hello World</h1>
      <a 
        href="https://coolify.io"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white p-2 rounded-md inline-block"
      >
        Click me
      </a>
    </div>
  );
}
