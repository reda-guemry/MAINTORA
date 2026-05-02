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
  { label: "All", value: "all" },
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
    <div className="space-y-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            User Management
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Configure user access levels and system permissions.
          </p>
        </div>
        <button
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2d7373]"
          type="button"
          onClick={handleOpenAdd}
        >
          <span className="material-symbols-outlined text-[18px]">
            person_add
          </span>
          Add New User
        </button>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
              Role Filter
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Showing {activeRoleOption.label.toLowerCase()} users.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {roleFilterOptions.map((option) => {
              const isActive = option.value === selectedRole;
              const count =
                isActive && paginate ? paginate.total : undefined;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleRoleChange(option.value)}
                  disabled={isLoading && isActive}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-bold transition-colors",
                    isActive
                      ? "border-[#388E8E] bg-[#eef7f6] text-[#2c7a7a]"
                      : "border-gray-200 bg-white text-gray-500 hover:border-[#388E8E]/30 hover:bg-gray-50 hover:text-gray-800",
                  )}
                >
                  {option.label}
                  {count !== undefined && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px]",
                        isActive
                          ? "bg-white text-[#2c7a7a]"
                          : "bg-gray-100 text-gray-500",
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <UsersTable
        users={users}
        isLoading={isLoading}
        error={error}
        emptyMessage={
          selectedRole === "all"
            ? "No users found."
            : `No users found for ${activeRoleOption.label}.`
        }
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      >
        <AppPagination
          currentPage={currentPage}
          lastPage={paginate?.last_page ?? 1}
          from={paginate?.from ?? 0}
          to={paginate?.to ?? 0}
          total={paginate?.total ?? 0}
          isLoading={isLoading}
          label="users"
          onPageChange={handlePageChange}
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
