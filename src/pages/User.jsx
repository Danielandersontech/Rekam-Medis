import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import ModalForm from "../components/ModalForm";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div id="dashboard-container">
      <PageHeader title="Users" breadcrumb={["Dashboard", "Users"]}>
        <button
          onClick={() => setShowModal(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Add New User
        </button>
      </PageHeader>

      <div className="p-8 overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left text-gray-700 
        bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Avatar</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Gender</th>
              <th className="px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-50 transition`}
              >
                <td className="px-6 py-4 font-medium">{user.id}</td>
                <td className="px-6 py-4">
                  <img
                    src={user.image}
                    alt={user.firstName}
                    className="w-8 h-8 rounded-full"
                  />
                </td>
                <td className="px-6 py-4">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4 capitalize">{user.gender}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalForm
        title="Add New User"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <form className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            className="w-full border px-3 py-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border px-3 py-2 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full border px-3 py-2 rounded-lg"
          />
          <select className="w-full border px-3 py-2 rounded-lg">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select className="w-full border px-3 py-2 rounded-lg">
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <div className="text-right">
            <button
              type="submit"
              className="bg-hijau text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
}
