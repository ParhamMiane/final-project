import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";
import { BASE_URL } from "../../constants/index.js";
import Button from "../../components/design-system/DsButton.js";
import Loading from "../../components/design-system/DsButton.js";
import ToDoItems from "./ToDoItems.js";

interface Todo {
  id: number; 
  title: string;
  completed: boolean;
}

const ToDos = () => {
const [todos, setTodos] = useState<Todo[]>([]);

const [isLoading, setIsLoading] = useState(true);

const [formLoading, setFormLoading] = useState(false);

const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    isCompleted: false,
  });

   const [showError, setShowError] = useState(false);

  const gettodos = () => {
    fetch(`${BASE_URL}/todos`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTodos(data);
      })
      .catch((response) => {
        console.error(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    gettodos();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

    setShowError(false);
    if (!formData.title) {
      setShowError(true);
      return;
    }

    setFormLoading(true);

    fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },

      body: JSON.stringify({
        title: formData.title,
        completed: formData.isCompleted,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newItems = [...todos, data];

        // {title: formData.title, completed: formData.isCompleted}
        setTodos(newItems);

        alert("ToDo Added succesfully");

        setFormData({ title: "", isCompleted: false });
      })
    .catch((error) => console.error(error))
    .finally(() => setFormLoading(false));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

 const prepareToEdit = (id: number) => {
  const editingItem = todos.find((x) => x.id === id);
  
  if (editingItem) {
    setEditingId(id);
    setFormData({
      title: editingItem.title,
      isCompleted: editingItem.completed, 
    });
  }
};

  const cancelEdit = () => {
    setFormData({
      title: "",
      isCompleted: false,
    });
    setEditingId(null);
  };

 const handleUpdate = (e: React.FormEvent) => {
  e.preventDefault();

    setShowError(false);
    if (!formData.title) {
      setShowError(true);
      return;
    }

    setFormLoading(true);

    fetch(`${BASE_URL}/todos/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },

      body: JSON.stringify({
        title: formData.title,
        completed: formData.isCompleted,
      }),
    })
      .then((res) => {
        console.log(res);

        const updatedItems = todos.map((todo) =>
          todo.id === editingId
            ? {
                ...todo,
                title: formData.title,
                completed: formData.isCompleted,
              }
            : todo,
        );
        setTodos(updatedItems);

        alert("ToDo Edited succesfully");

        setEditingId(null);
        setFormData({ title: "", isCompleted: false });
      })
      .catch((error) => console.error(error))
      .finally(() => setFormLoading(false));
  };

  const afterDelete = (id: number) => {
    const remainItems = todos.filter((todo) => todo.id !== id);
    setTodos(remainItems);
  };

  const changeItemStatus = (id: number, newStatus: boolean) => {
    const updatedItems = todos.map((item) =>
      item.id === id ? { ...item, completed: newStatus } : item,
    );
    setTodos(updatedItems);
  };
  return (
    <section className="overflow-auto h-[90vh] grid grid-cols-3 gap-4 mx-auto max-w-3/4">
      <div>
        <div className="fixed top-0">
          <form
            onSubmit={(e) => (editingId ? handleUpdate(e) : handleSubmit(e))}
            className="mt-8"
          >
            <h2 className="text-2xl p-2 bg-slate-700 rounded-lg font-bold mb-4">
              Form
            </h2>
            <label className="text-2xl mb-1 flex justify-between items-end">
              Title
              {showError && (
                <span className="text-red-500 text-xs">Title Is Recuierd</span>
              )}
            </label>
            <input
              type="text"
              placeholder="Enter ToDo Title"
              className="border-2 border-gray-300 bg-gray-700 p-3 min-w-full rounded-xl text-xl mb-2"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <div className="mb-2">
              <label className=" flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  checked={formData.isCompleted}
                  onChange={(e) =>
                    setFormData({ ...formData, isCompleted: e.target.checked })
                  }
                />
                completed
              </label>
            </div>
            {editingId ? (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  color="green"
                  size="lg"
                  isLoading={formLoading}
                >
                  <IoAddCircle /> save
                </Button>
                <Button
                  type="button"
                  color="red"
                  size="lg"
                  onClick={cancelEdit}
                >
                  <AiFillCloseCircle /> Cancel
                </Button>
              </div>
            ) : (
              <Button
                type="submit"
                color="green"
                size="lg"
                isLoading={formLoading}
              >
                <IoAddCircle /> Add
              </Button>
            )}
          </form>
        </div>
      </div>

      <div className="col-span-2">
        <h2 className="rounded-lg py-2 bg-slate-700 sticky top-0 text-2xl font-bold mb-4">
          List
        </h2>
        {isLoading ? (
          <Loading />
        ) : (
          <ul className="divide-y divide-gray-500 border border-gray-300 p-1 rounded-xl overflow-hidden">
            {todos.map((item) => {
              return (
                <ToDoItems
                  key={item.id}
                  todo={item}
                  prepareToEdit={prepareToEdit}
                  changeItemStatus={changeItemStatus}
                  afterDelete={afterDelete}
                />
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
export default ToDos;
