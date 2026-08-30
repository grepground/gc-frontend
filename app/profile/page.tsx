"use client";

import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../services/api";
import Image from "next/image";

type EditableField = "firstName" | "lastName" | "nickname" | "email";

export default function ProfilePage() {
  const { user, loading, refreshUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] =
    useState<boolean>(false);
  const [isAvatarOptionsModalOpen, setIsAvatarOptionsModalOpen] =
    useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [isAvatarUploading, setIsAvatarUploading] = useState<boolean>(false);

  const [profileStatus, setProfileStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [passwordStatus, setPasswordStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-3">
        <div className="w-10 h-10 rounded-full border-4 border-chess-primary/20 border-t-chess-primary animate-spin" />
        <p className="font-bold text-xs text-chess-text/60 tracking-wider">
          Loading player profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 bg-chess-surface p-8 rounded-3xl text-center font-bold text-sm text-chess-text">
        <span>♟️ Please log in to view your player dashboard.</span>
      </div>
    );
  }

  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
  const apiBase = backendUrl.replace("/api/v1", "");

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setIsAvatarUploading(true);
      setProfileStatus(null);

      await apiFetch(`/users/${user.id}/avatar`, {
        method: "PATCH",
        body: formData,
      });

      setProfileStatus({
        type: "success",
        msg: "Profile picture updated successfully!",
      });
      await refreshUser();
    } catch (err: any) {
      setProfileStatus({
        type: "error",
        msg: err.message || "Failed to upload image.",
      });
    } finally {
      setIsAvatarUploading(false);
      setIsAvatarOptionsModalOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const createFieldUpdateAction = (
    fieldName: EditableField,
    label: string,
    originalValue: string,
  ) => {
    return async (formData: FormData) => {
      setProfileStatus(null);
      const value = ((formData.get(fieldName) as string) || "").trim();

      if (value === originalValue.trim()) {
        setEditingField(null);
        return;
      }

      try {
        await apiFetch(`/users/${user.id}`, {
          method: "PATCH",
          body: JSON.stringify({ [fieldName]: value || null }),
        });
        setProfileStatus({
          type: "success",
          msg: `${label} updated successfully!`,
        });
        setEditingField(null);
        await refreshUser();
      } catch (err: any) {
        setProfileStatus({
          type: "error",
          msg: err.message || `Failed to update ${label}.`,
        });
      }
    };
  };

  const handleUpdatePassword = async (formData: FormData) => {
    setPasswordStatus(null);
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: "error", msg: "New passwords do not match." });
      return;
    }

    try {
      await apiFetch(`/users/${user.id}/password`, {
        method: "PATCH",
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      setPasswordStatus({
        type: "success",
        msg: "Password changed successfully!",
      });
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setPasswordStatus(null);
      }, 1500);
    } catch (err: any) {
      setPasswordStatus({
        type: "error",
        msg: err.message || "Failed to update security password.",
      });
    }
  };

  const renderProfileFieldRow = (
    fieldName: EditableField,
    label: string,
    currentValue: string,
    placeholder: string,
  ) => {
    const isEditing = editingField === fieldName;

    return (
      <div
        onClick={() => {
          if (!isEditing) {
            setEditingField(fieldName);
            setProfileStatus(null);
          }
        }}
        className={`p-4 rounded-2xl transition-all duration-200 cursor-pointer ${
          !isEditing
            ? "bg-chess-bg/50 hover:bg-chess-bg hover:translate-x-1 group/row"
            : "bg-chess-bg"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="space-y-1 flex-1">
            <span className="text-xs font-black uppercase tracking-wider text-chess-primary block">
              {label}
            </span>
            {!isEditing && (
              <span className="text-sm font-extrabold text-chess-text block truncate">
                {currentValue || (
                  <span className="opacity-30 font-semibold text-xs">
                    Not configured yet
                  </span>
                )}
              </span>
            )}
          </div>
          {!isEditing && (
            <div className="flex items-center gap-1.5 text-xs font-black text-chess-text/40 group-hover/row:text-chess-primary transition-colors bg-chess-surface px-3 py-1.5 rounded-xl">
              <span>Edit</span>
              <span>✏️</span>
            </div>
          )}
        </div>

        {isEditing && (
          <form
            action={createFieldUpdateAction(fieldName, label, currentValue)}
            onClick={(e) => e.stopPropagation()}
            className="w-full space-y-3 mt-3"
          >
            <input
              type={fieldName === "email" ? "email" : "text"}
              name={fieldName}
              defaultValue={currentValue}
              autoFocus
              required
              className="w-full bg-chess-surface px-4 py-3 rounded-xl font-bold text-sm text-chess-text focus:outline-none ring-2 ring-chess-primary/50 transition-all"
              placeholder={placeholder}
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingField(null);
                  setProfileStatus(null);
                }}
                className="text-xs font-bold opacity-60 hover:opacity-100 transition-opacity py-2 px-3 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-chess-primary text-chess-surface font-black px-5 py-2 rounded-xl text-xs hover:opacity-90 transition-all cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

  const playerInitial = (
    user.nickname ||
    user.firstName ||
    user.username ||
    "P"
  )
    .charAt(0)
    .toUpperCase();

  const avatarSrc = user.avatar
    ? `${apiBase}/images/avatars/${user.avatar}`
    : null;

  return (
    <div className="space-y-6 py-4 text-chess-text max-w-3xl mx-auto relative">
      {/* Title */}
      <section className="space-y-1">
        <div className="text-xs font-black uppercase tracking-wider text-chess-primary flex items-center gap-1.5">
          <span>♟️</span> Player Settings
        </div>
        <h1 className="text-3xl font-black tracking-tight text-chess-text md:text-4xl">
          Player Dashboard
        </h1>
        <p className="text-sm font-bold text-chess-text/60">
          Manage your account settings, public metadata, and security
          credentials.
        </p>
      </section>

      {/* Main Box */}
      <div className="bg-chess-surface p-6 md:p-8 rounded-3xl space-y-6">
        {/* Profile Card Top */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-chess-bg w-full">
          <div
            onClick={() => setIsAvatarOptionsModalOpen(true)}
            className="w-20 h-20 rounded-full bg-chess-bg flex items-center justify-center relative overflow-hidden select-none cursor-pointer group/avatar shrink-0"
          >
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={user.username}
                fill
                sizes="80px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <span className="font-black text-2xl text-chess-primary">
                {playerInitial}
              </span>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-black tracking-wider text-chess-text">
              Manage 📷
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex-1 w-full grid grid-cols-2 gap-4 text-center sm:text-left">
            <div className="space-y-0.5">
              <span className="text-xs font-black uppercase tracking-wider text-chess-primary/80 block">
                Account Username
              </span>
              <span className="text-base font-black text-chess-text truncate block">
                {user.username}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-black uppercase tracking-wider text-chess-primary/80 block">
                Platform Role
              </span>
              <div>
                <span className="inline-block text-xs font-black bg-chess-primary/10 text-chess-primary px-3 py-0.5 rounded-full capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-black tracking-tight">
              Profile Credentials
            </h2>
            <span className="text-xs font-bold text-chess-text/40">
              Click field to edit
            </span>
          </div>

          {profileStatus && (
            <div
              className={`px-4 py-3 rounded-2xl font-bold text-xs ${
                profileStatus.type === "success"
                  ? "bg-chess-primary/10 text-chess-primary"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {profileStatus.msg}
            </div>
          )}

          <div className="space-y-2">
            {renderProfileFieldRow(
              "firstName",
              "First Name",
              user.firstName || "",
              "e.g., Bobby",
            )}
            {renderProfileFieldRow(
              "lastName",
              "Last Name",
              user.lastName || "",
              "e.g., Fischer",
            )}
            {renderProfileFieldRow(
              "nickname",
              "Chess Nickname",
              user.nickname || "",
              "e.g., SpeedDemon",
            )}
            {renderProfileFieldRow(
              "email",
              "Email Address",
              user.email || "",
              "e.g., player@grepground.org",
            )}
          </div>
        </div>

        {/* Security */}
        <div className="pt-4 border-t border-chess-bg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h2 className="text-base font-black tracking-tight">
              Account Security
            </h2>
            <p className="text-xs font-bold text-chess-text/50">
              Update your password regularly to protect your player data.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-chess-primary text-chess-surface font-black px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer whitespace-nowrap text-center"
          >
            Update Password 🔒
          </button>
        </div>
      </div>

      {/* 1. SEÇENEKLER MODALI (Boşa basınca kapanır) */}
      {isAvatarOptionsModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget)
              setIsAvatarOptionsModalOpen(false);
          }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 cursor-pointer"
        >
          <div className="w-full max-w-xs bg-chess-surface p-6 rounded-3xl space-y-4 cursor-default">
            <div className="flex justify-between items-center pb-2 border-b border-chess-bg">
              <h3 className="text-base font-black tracking-tight">
                Profile Picture
              </h3>
              <button
                type="button"
                onClick={() => setIsAvatarOptionsModalOpen(false)}
                className="w-7 h-7 rounded-full font-black text-xs flex items-center justify-center bg-chess-bg hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 pt-1">
              {avatarSrc && (
                <button
                  type="button"
                  onClick={() => {
                    setIsAvatarOptionsModalOpen(false);
                    setIsPreviewModalOpen(true);
                  }}
                  className="w-full bg-chess-bg hover:bg-chess-surface-hover font-bold text-chess-text px-4 py-3 rounded-2xl text-xs transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>View Avatar</span>
                  <span>🔍</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="w-full bg-chess-primary text-chess-surface hover:opacity-90 font-black px-4 py-3 rounded-2xl text-xs transition-opacity flex items-center justify-between cursor-pointer"
              >
                <span>Upload New Picture</span>
                <span>📷</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. BÜYÜK GÖRSEL ÖNİZLEME MODALI (Tam Boyut & Boşa basınca kapanır) */}
      {isPreviewModalOpen && avatarSrc && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPreviewModalOpen(false);
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 cursor-pointer"
        >
          <div className="relative bg-chess-surface p-4 rounded-3xl space-y-4 max-w-lg w-full flex flex-col items-center cursor-default max-h-[85vh]">
            <div className="w-full flex justify-between items-center border-b border-chess-bg pb-2 px-2">
              <span className="text-xs font-black text-chess-text">
                {user.username}&apos;s Avatar
              </span>
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="w-7 h-7 rounded-full font-black text-xs flex items-center justify-center bg-chess-bg hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Görsel tam oranını korur (object-contain) ve kutuya sığar */}
            <div className="w-full h-[60vh] max-h-[450px] relative rounded-2xl overflow-hidden bg-chess-bg/40">
              <Image
                src={avatarSrc}
                alt={user.username}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. YÜKLENİYOR MODALI (Kapatılamaz kilitli ekran) */}
      {isAvatarUploading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-[60] select-none">
          <div className="bg-chess-surface p-8 rounded-3xl space-y-4 max-w-xs w-full text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-4 border-chess-primary/20 border-t-chess-primary animate-spin" />
            <div className="space-y-1">
              <h4 className="font-black text-sm text-chess-text">
                Uploading Image...
              </h4>
              <p className="text-xs font-bold text-chess-text/50">
                Please wait while we process your profile photo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. ŞİFRE MODALI (Boşa basınca kapanır) */}
      {isPasswordModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsPasswordModalOpen(false);
              setPasswordStatus(null);
            }
          }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 cursor-pointer"
        >
          <div className="w-full max-w-sm bg-chess-surface p-6 rounded-3xl space-y-4 cursor-default">
            <div className="flex justify-between items-start pb-2 border-b border-chess-bg">
              <div className="space-y-0.5">
                <h3 className="text-base font-black tracking-tight">
                  Change Password
                </h3>
                <p className="text-[10px] font-black text-chess-primary uppercase tracking-wider">
                  Security Engine
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsPasswordModalOpen(false);
                  setPasswordStatus(null);
                }}
                className="w-7 h-7 rounded-full font-black text-xs flex items-center justify-center bg-chess-bg hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {passwordStatus && (
              <div
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs ${
                  passwordStatus.type === "success"
                    ? "bg-chess-primary/10 text-chess-primary"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {passwordStatus.msg}
              </div>
            )}

            <form
              action={handleUpdatePassword}
              className="space-y-3 text-xs font-bold"
            >
              <div className="space-y-1">
                <label className="text-chess-text/70 font-extrabold">
                  Current Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  required
                  className="w-full bg-chess-bg px-4 py-2.5 rounded-xl font-medium focus:outline-none text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-1">
                <label className="text-chess-text/70 font-extrabold">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  className="w-full bg-chess-bg px-4 py-2.5 rounded-xl font-medium focus:outline-none text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-1">
                <label className="text-chess-text/70 font-extrabold">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="w-full bg-chess-bg px-4 py-2.5 rounded-xl font-medium focus:outline-none text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setPasswordStatus(null);
                  }}
                  className="font-black py-2.5 rounded-xl bg-chess-bg hover:bg-chess-surface-hover transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-chess-primary text-chess-surface font-black py-2.5 rounded-xl hover:opacity-90 transition-all cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
