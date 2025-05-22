import PageHeader from "../components/PageHeader";
import ordersData from "../assets/orders.json";
import { useState } from "react";
import ModalForm from "../components/ModalForm";

export default function Orders() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="dashboard-container">
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Orders"]}>
        <button
          onClick={() => setShowModal(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Add New Orders
        </button>
      </PageHeader>

      <div className="p-8 overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left text-gray-700 bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Total Price</th>
              <th className="px-6 py-3">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order, index) => (
              <tr
                key={order.order_id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-50 transition`}
              >
                <td className="px-6 py-4 font-medium">{order.order_id}</td>
                <td className="px-6 py-4">{order.customer_name}</td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="px-6 py-4">${order.total_price}</td>
                <td className="px-6 py-4">{order.order_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalForm
        title="Add New Order"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Customer Name"
            className="w-full border px-3 py-2 rounded-lg"
          />
          <select className="w-full border px-3 py-2 rounded-lg">
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input
            type="number"
            placeholder="Total Price"
            className="w-full border px-3 py-2 rounded-lg"
          />
          <input
            type="date"
            placeholder="Order Date"
            className="w-full border px-3 py-2 rounded-lg"
          />
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