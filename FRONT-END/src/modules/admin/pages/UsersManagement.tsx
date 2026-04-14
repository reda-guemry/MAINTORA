import { useState } from "react";
import { DeleteUserDialog } from "@/features/users/components/DeleteUserDialog";
import { EditUserModal } from "@/features/users/components/EditUserModal";
import { UsersPagination } from "@/features/users/components/UsersPagination";
import { UsersTable } from "@/features/users/components/UsersTable";
import usePaginateUser from "@/features/users/hooks/usePaginateUser";
import type { EditUserPayload } from "@/features/users/types/usersComponents";
import type { User } from "@/features/auth/types/auth.type";
import { useEdit } from "@/features/users/hooks/useEdit";
import { useDelete } from "@/features/users/hooks/useDelete";

export default function UsersManagement() {
  const { paginate, isLoading, currentPage, setPage, error } = usePaginateUser();

  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const { editUserCall , error: editError } = useEdit();
  const { deleteUserCall, error: deleteError } = useDelete();


  const users = paginate?.data ?? [];

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

  function handleEditSubmit(payload: EditUserPayload) {
    if (!editUser) return;

    editUserCall(editUser.id, payload);
    
    handleCloseEdit();
  }

  function handleDeleteConfirm() {
    if (!deleteUser) return;

    deleteUserCall(deleteUser.id);
    handleCloseDelete();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-sm text-gray-500 mt-1.5">Configure user access levels and system permissions.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2d7373] transition-colors shadow-sm" type="button">
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Add New User
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-8 text-sm font-medium">
          <a href="#" className="text-primary border-b-2 border-primary pb-4 px-1">
            All Members ( {users.length} )
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 pb-4 px-1 transition-colors">
            Administrators
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 pb-4 px-1 transition-colors">
            Technicians
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 pb-4 px-1 transition-colors">
            Pending Invites
          </a>
        </nav>
      </div>

      <UsersTable users={users} isLoading={isLoading} error={error} onEdit={handleOpenEdit} onDelete={handleOpenDelete}>
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
    </div>
  );
}
