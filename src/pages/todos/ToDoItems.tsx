import { FaUndo } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import Button from "../../components/design-system/DsButton.js";
import { BASE_URL } from "../../constants/index.js";

type Todo = {
  id: number; 
  title: string;
  completed: boolean;
};

type PropTypes = {
  todo: Todo;
  prepareToEdit: (id: number) => void;
  changeItemStatus: (id: number, newStatus: boolean) => void;
  afterDelete: (id: number) => void;
};

const ToDoItems = ({ todo, prepareToEdit, changeItemStatus, afterDelete }: PropTypes) => {
  const handleDelete = () => {
    if (!window.confirm("Are You Sure?")) {
      return;
    }

    fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        console.log(res);
        afterDelete(todo.id);
        alert("ToDo Deleted successfully");
      })
      .catch((error) => console.error(error));
  };

  const handleChangeStatus = (newStatus: boolean) => {
    fetch(`${BASE_URL}/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        ...todo,
        completed: newStatus,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        console.log(res);

        changeItemStatus(todo.id, newStatus);
        
        alert("ToDo Status Changed successfully");
      })
      .catch((error) => console.error("Fetch Error:", error));
  };

  return (
    <li className="flex justify-between py-3 hover:bg-gray-800">
      <p
        className={`text-lg ${todo.completed ? "line-through opacity-50" : ""}`}
      >
        {todo.title}
      </p>
      <div className="flex justify-between min-w-30">
        {!todo.completed ? (
          <Button
            size="2xl"
            toolTip="Completed"
            color="green"
            onClick={() => handleChangeStatus(true)}
          >
            <TiTick />
          </Button>
        ) : (
          <Button
            size="2xl"
            toolTip="Undo"
            color="blue"
            onClick={() => handleChangeStatus(false)}
          >
            <FaUndo />
          </Button>
        )}
        <Button
          size="2xl"
          toolTip="Edit"
          color="gray"
          onClick={() => prepareToEdit(todo.id)}
        >
          <MdEdit />
        </Button>

        <Button size="2xl" toolTip="Delete" onClick={handleDelete} color="red">
          <MdDeleteForever />
        </Button>
      </div>
    </li>
  );
};

export default ToDoItems;