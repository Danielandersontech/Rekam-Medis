import PageHeader from "../components/PageHeader";
import customersData from "../assets/customers.json";
import { useState } from "react";
import ModalForm from "../components/ModalForm";

export default function Customers() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="dashboard-container">
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customers"]}>
        <button
          onClick={() => setShowModal(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Add New Customers
        </button>
      </PageHeader>

      <div className="p-8 overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left text-gray-700 bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">Customer ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Loyalty</th>
            </tr>
          </thead>
          <tbody>
            {customersData.map((customer, index) => (
              <tr
                key={customer.customer_id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-50 transition`}
              >
                <td className="px-6 py-4 font-medium">{customer.customer_id}</td>
                <td className="px-6 py-4">{customer.customer_name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4">{customer.loyalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalForm
        title="Add New Customer"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Customer Name"
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
            <option value="">Select Loyalty</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
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
