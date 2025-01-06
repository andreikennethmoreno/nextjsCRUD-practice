"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { getEmployeelist } from "@/lib/action";
import { formatDate } from "@/lib/utils";
import { DeleteButton } from "@/components/delete";

const Employee = () => {
  const [query, setQuery] = useState<string>("");
  const [employees, setEmployees] = useState<any[]>([]);

  // Fetch employees whenever the query changes
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeData = await getEmployeelist(query);
        setEmployees(employeeData);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, [query]); // Re-run whenever the query changes

  // Update the employee list after a deletion
  const handleDelete = (deletedEmployeeId: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== deletedEmployeeId)
    );
  };

  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
      <div className="flex items-center justify-between gap-1 mb-5">
        <h1 className="text-4xl font-bold">
          Next.js 14 CRUD Create, Read, Update and Delete <br />
          Prisma PostgreSQL | TailwindCSS DaisyUI
        </h1>
      </div>
      <div className="overflow-x-auto">
        <div className="mb-2 w-full flex justify-between">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-96"
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Update query state
            />
          </div>

          <Link href="/employee/create" className="btn btn-primary">
            Create
          </Link>
        </div>
        <table className="table table-zebra">
          <thead className="text-sm uppercase">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Phone Number</th>
              <th className="py-3 px-6">Created At</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((rs, index) => (
              <tr key={rs.id} className="border-b">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{rs.name}</td>
                <td className="py-3 px-6">{rs.email}</td>
                <td className="py-3 px-6">{rs.phone}</td>
                <td className="py-3 px-6">
                  {formatDate(rs.createdAt.toString())}
                </td>
                <td className="flex justify-center gap-1 py-3">
                  <Link href={`/employee/edit/${rs.id}`} className="btn btn-info">
                    Edit
                  </Link>
                  <DeleteButton id={rs.id} onDelete={handleDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
