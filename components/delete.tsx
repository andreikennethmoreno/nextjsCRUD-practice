import { deleteEmployee } from "@/lib/action";

export const DeleteButton = ({
  id,
  onDelete,
}: {
  id: string;
  onDelete: (deletedEmployeeId: string) => void;
}) => {
  const DeleteEmployeetWithId = async () => {
    try {
      await deleteEmployee(id);
      onDelete(id); // Call the callback to update the employee list in parent
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
      <button
        type="button"
        className="btn btn-error"
        onClick={DeleteEmployeetWithId}
      >
        Delete
      </button>
    </form>
  );
};
