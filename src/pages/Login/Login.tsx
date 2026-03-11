import { useState } from "react";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h1 className="mb-6 text-2xl font-bold text-center">
          Crypto Dashboard
        </h1>

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-sm">Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="email@email.com"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm">Senha</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
