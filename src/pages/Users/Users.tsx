import { useState } from "react";
import { users } from "../../mocks/users";
import { formatDate } from "../../utils/dateParse";

const ITEMS_PER_PAGE = 5;

export default function Users() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "ALL" || user.status === status;

    return matchesSearch && matchesStatus;
  });

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(start, start + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold dark:text-white">Usuários</h1>

        <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto">
          <input
            type="text"
            placeholder="Buscar usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="ALL">Todos</option>
            <option value="ACTIVE">Ativo</option>
            <option value="PENDING">Pendente</option>
            <option value="BLOCKED">Bloqueado</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow dark:bg-gray-800 rounded-xl">
        <div className="bg-white shadow dark:bg-gray-800 rounded-xl">
          <table className="w-full">

            <thead className="hidden md:table-header-group bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left dark:text-white">Nome</th>
                <th className="p-3 text-left dark:text-white">Email</th>
                <th className="p-3 text-left dark:text-white">Status</th>
                <th className="p-3 text-left dark:text-white">Criado</th>
                <th className="p-3 text-left dark:text-white">
                  Última atividade
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="block border-b md:table-row dark:border-gray-700"
                >
                  <td className="flex justify-between p-3 md:table-cell dark:text-white">
                    <span className="font-semibold md:hidden">Nome</span>
                    {user.name}
                  </td>

                  <td className="flex justify-between p-3 md:table-cell dark:text-white">
                    <span className="font-semibold md:hidden">Email</span>
                    {user.email}
                  </td>

                  <td className="flex justify-between p-3 md:table-cell">
                    <span className="font-semibold md:hidden dark:text-white">
                      Status
                    </span>

                    <span
                      className={`px-2 py-1 text-xs rounded
                ${user.status === "ACTIVE" && "bg-green-100 text-green-600"}
                ${user.status === "PENDING" && "bg-yellow-100 text-yellow-600"}
                ${user.status === "BLOCKED" && "bg-red-100 text-red-600"}
              `}
                    >
                      {user.status === "ACTIVE"
                        ? "Ativo"
                        : user.status === "PENDING"
                        ? "Pendente"
                        : "Bloqueado"}
                    </span>
                  </td>

                  <td className="flex justify-between p-3 md:table-cell dark:text-white">
                    <span className="font-semibold md:hidden">Criado</span>
                    {formatDate(user.createdIn)}
                  </td>

                  <td className="flex justify-between p-3 md:table-cell dark:text-white">
                    <span className="font-semibold md:hidden">
                      Última atividade
                    </span>
                    {formatDate(user.lastActivity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col items-center justify-end gap-3 sm:flex-row">
        <span className="text-sm dark:text-white">
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 transition-colors border rounded dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        <span className="px-3 py-1 dark:text-white">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 transition-colors border rounded dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
