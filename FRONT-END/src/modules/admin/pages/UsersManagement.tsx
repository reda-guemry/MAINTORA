import { useState } from "react";
import type { User } from "@/features/auth";
import {
  AddUserModal,
  DeleteUserDialog,
  EditUserModal,
  useCreateUser,
  useDeleteUser,
  useEditUser,
  usePaginateUser,
  UsersPagination,
  UsersTable,
} from "@/features/user";

import type { AddUserPayload, EditUserPayload } from "@/features/user";

export default function UsersManagement() {
  const {
    paginate,
    isLoading,
    currentPage,
    setPage,
    error,
    updateUserInList,
    removeUserFromList,
    addUserToList,
  } = usePaginateUser();

  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const { editUserCall, error: editError } = useEditUser();
  const { deleteUserCall } = useDeleteUser();
  const { createUserCall } = useCreateUser();

  const users = paginate?.data ?? [];
  // console.log(paginate);

  function handleOpenEdit(user: User) {
    setEditUser(user);
  }

  function handleOpenDelete(user: User) {
    setDeleteUser(user);
  }

  function handleCloseEdit() {
    setEditUser(null);
  }

  function handleCloseDelete() {
    setDeleteUser(null);
  }

  function handleOpenAdd() {
    setIsAddModalOpen(true);
  }

  function handleCloseAdd() {
    setIsAddModalOpen(false);
  }

  async function handleAddSubmit(payload: AddUserPayload) {
    setIsCreatingUser(true);
    try {
      const response = await createUserCall(payload);
      if (response) {
        addUserToList(response.data);
      }

      handleCloseAdd();
    } finally {
      setIsCreatingUser(false);
    }
  }

  async function handleEditSubmit(payload: EditUserPayload) {
    if (!editUser) return;

    const ok = await editUserCall(editUser.id, payload);

    if (ok) {
      updateUserInList({ ...editUser, ...payload });
      handleCloseEdit();
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteUser) return;

    const ok = await deleteUserCall(deleteUser.id);

    if (ok) {
      removeUserFromList(deleteUser.id);
      handleCloseDelete();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            Configure user access levels and system permissions.
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2d7373] transition-colors shadow-sm"
          type="button"
          onClick={handleOpenAdd}
        >
          <span className="material-symbols-outlined text-[18px]">
            person_add
          </span>
          Add New User
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-8 text-sm font-medium">
          <a
            href="#"
            className="text-primary border-b-2 border-primary pb-4 px-1"
          >
            All Members ( {users.length} )
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-700 pb-4 px-1 transition-colors"
          >
            Administrators
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-700 pb-4 px-1 transition-colors"
          >
            Technicians
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-700 pb-4 px-1 transition-colors"
          >
            Pending Invites
          </a>
        </nav>
      </div>

      <UsersTable
        users={users}
        isLoading={isLoading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      >
        <UsersPagination
          currentPage={currentPage}
          lastPage={paginate?.last_page ?? 1}
          from={paginate?.from ?? 0}
          to={paginate?.to ?? 0}
          total={paginate?.total ?? 0}
          isLoading={isLoading}
          onPageChange={setPage}
        />
      </UsersTable>

      <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 tracking-widest uppercase mt-8 pb-4">
        <div className="flex gap-8">
          <span>SESSION: CMMS-ADMIN-PRV-93</span>
          <span>SERVER: AWS-US-EAST-1</span>
        </div>
        <span>LAST SYSTEM SYNC: 2023-11-24 14:32:01 UTC</span>
      </div>

      <EditUserModal
        user={editUser}
        onClose={handleCloseEdit}
        onSubmit={handleEditSubmit}
        editError={editError}
      />

      <DeleteUserDialog
        user={deleteUser}
        onClose={handleCloseDelete}
        onConfirm={handleDeleteConfirm}
      />

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAdd}
        onSubmit={handleAddSubmit}
        isLoading={isCreatingUser}
      />
    </div>
  );
}
