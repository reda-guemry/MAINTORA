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
  UsersTable,
} from "@/features/user";

import type {
  AddUserPayload,
  EditUserPayload,
  UserRoleFilterOption,
  UserRoleFilterValue,
} from "@/features/user";
import { AppPagination } from "@/shared/components";
import { cn } from "@/shared/utils";

const roleFilterOptions: UserRoleFilterOption[] = [
  { label: "All Users", value: "all" },
  { label: "Admin", value: "admin", apiValue: "admin" },
  { label: "Chef Technician", value: "chef_technician", apiValue: "chef_technician" },
  { label: "Technician", value: "technician", apiValue: "technician" },
  { label: "Client", value: "client", apiValue: "client" },
];

export default function UsersManagement() {
  const [selectedRole, setSelectedRole] = useState<UserRoleFilterValue>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    paginate,
    isLoading,
    error,
    refreshUsers,
  } = usePaginateUser({ role: selectedRole, page: currentPage });

  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const { editUserCall, error: editError } = useEditUser();
  const { deleteUserCall } = useDeleteUser();
  const { createUserCall } = useCreateUser();

  const users = paginate?.data ?? [];
  const activeRoleOption =
    roleFilterOptions.find((option) => option.value === selectedRole) ??
    roleFilterOptions[0];

  function handleRoleChange(nextRole: UserRoleFilterValue) {
    setSelectedRole(nextRole);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleOpenEdit(user: User) {
    setEditUser(user);
  }

  function handleOpenDelete(user: User) {
    handleOpenDelete;
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
        await refreshUsers();
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
      await refreshUsers();
      handleCloseEdit();
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteUser) return;
    const ok = await deleteUserCall(deleteUser.id);
    if (ok) {
      await refreshUsers();
      handleCloseDelete();
    }
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            User Management
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Maintain system security and manage user credentials.
          </p>
        </div>
        <button
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#43968C] px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-teal-900/10 transition-all hover:bg-[#367a72] active:scale-[0.98]"
          type="button"
          onClick={handleOpenAdd}
        >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Add New User
        </button>
      </div>

      <section className="rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#43968C]">
              Quick Filters
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              Access Levels: <span className="text-slate-400 font-medium">{activeRoleOption.label}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {roleFilterOptions.map((option) => {
              const isActive = option.value === selectedRole;
              const count = isActive && paginate ? paginate.total : undefined;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleRoleChange(option.value)}
                  disabled={isLoading && isActive}
                  className={cn(
                    "inline-flex items-center gap-3 rounded-xl border px-5 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all",
                    isActive
                      ? "border-[#43968C] bg-teal-50 text-[#43968C] shadow-sm"
                      : "border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-600",
                  )}
                >
                  {option.label}
                  {count !== undefined && (
                    <span className={cn(
                      "rounded-lg px-2 py-0.5 text-[10px] font-black",
                      isActive ? "bg-[#43968C] text-white" : "bg-slate-100 text-slate-400"
                    )}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="rounded-4xl border border-slate-200/60 bg-white p-2 shadow-sm overflow-hidden">
        <UsersTable
          users={users}
          isLoading={isLoading}
          error={error}
          emptyMessage={`No accounts found for ${activeRoleOption.label}.`}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        >
          <div className="px-6 py-6 border-t border-slate-50">
            <AppPagination
              currentPage={currentPage}
              lastPage={paginate?.last_page ?? 1}
              from={paginate?.from ?? 0}
              to={paginate?.to ?? 0}
              total={paginate?.total ?? 0}
              isLoading={isLoading}
              label="registered users"
              onPageChange={handlePageChange}
            />
          </div>
        </UsersTable>
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