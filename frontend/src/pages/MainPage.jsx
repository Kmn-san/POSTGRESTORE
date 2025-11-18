
export default function MainPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">

      <h1 className="text-5xl md:text-6xl font-bold mb-4">POSTGRESTORE</h1>
      <p className="text-lg md:text-xl mb-8">Upload your items here!</p>

      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href="/register"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Register
        </a>
        <a
          href="/login"
          className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-black transition"
        >
          Login
        </a>
      </div>
    </div>
  );
}
