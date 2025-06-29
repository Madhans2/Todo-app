import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function TaskModal({ isOpen, setIsOpen, onCreate }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const newTask = {
      title: form.title.value,
      description: form.description.value,
      dueDate: form.dueDate.value,
      status: 'in progress'
    }
    onCreate(newTask)
    setIsOpen(false)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" leave="ease-in duration-200"
          enterFrom="opacity-0" enterTo="opacity-100"
          leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all">
              <Dialog.Title className="text-lg font-bold">New Task</Dialog.Title>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input name="title" placeholder="Title" required className="w-full border p-2 rounded" />
                <textarea name="description" placeholder="Description" required className="w-full border p-2 rounded" />
                <input type="date" name="dueDate" className="w-full border p-2 rounded" />
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
