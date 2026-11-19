"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/auth/Avatar";
import { useAuth } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";

async function toSquareBlob(file: File, size = 256): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const side = Math.min(bmp.width, bmp.height);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("This browser cannot process images.");
  ctx.drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, size, size);
  bmp.close();
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not process the image."))), "image/webp", 0.9);
  });
}

type Props = { userId: string; email: string; initialName: string; initialAvatar: string | null; googleAvatar: string | null };

export function ProfileForm({ userId, email, initialName, initialAvatar, googleAvatar }: Props) {
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(initialName);
  const [avatar, setAvatar] = useState<string | null>(initialAvatar);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const pick = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMsg({ ok: false, text: "Please choose an image file." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMsg({ ok: false, text: "The image is larger than 5 MB." });
      return;
    }
    try {
      const out = await toSquareBlob(file);
      if (preview) URL.revokeObjectURL(preview);
      setBlob(out);
      setPreview(URL.createObjectURL(out));
      setMsg(null);
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Could not read the image." });
    }
  };

  const save = async () => {
    const clean = name.trim().replace(/\s+/g, " ");
    if (clean.length < 2 || clean.length > 40) {
      setMsg({ ok: false, text: "Name must be 2 to 40 characters." });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const supabase = createClient();
      let url = avatar;
      if (blob) {
        const path = `${userId}/avatar.webp`;
        const up = await supabase.storage.from("avatars").upload(path, blob, { upsert: true, contentType: "image/webp", cacheControl: "3600" });
        if (up.error) throw up.error;
        url = `${supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl}?v=${Date.now()}`;
      }
      const { error } = await supabase.from("profiles").upsert({ id: userId, display_name: clean, avatar_url: url, updated_at: new Date().toISOString() }, { onConflict: "id" });
      if (error) throw error;
      setAvatar(url);
      setBlob(null);
      setName(clean);
      await refreshProfile();
      router.refresh();
      setMsg({ ok: true, text: "Saved." });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Something went wrong." });
    } finally {
      setBusy(false);
    }
  };

  const shown = preview ?? avatar;

  return (
    <div className="sx-form">
      <div className="sx-form-photo">
        <Avatar name={name} src={shown} size={112} />
        <div className="sx-form-photo-btns">
          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={(e) => pick(e.target.files?.[0])} />
          <button type="button" className="btn btn-ghost" onClick={() => fileRef.current?.click()}>
            Upload photo
          </button>
          {googleAvatar ? (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setBlob(null);
                setPreview(null);
                setAvatar(googleAvatar);
              }}
            >
              Use Google photo
            </button>
          ) : null}
          {shown ? (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setBlob(null);
                setPreview(null);
                setAvatar(null);
              }}
            >
              Remove photo
            </button>
          ) : null}
        </div>
      </div>

      <label className="sx-field">
        <span>Display name</span>
        <input type="text" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} />
      </label>

      <label className="sx-field">
        <span>Email</span>
        <input type="email" value={email} readOnly disabled />
      </label>

      <div className="sx-form-actions">
        <button type="button" className="btn btn-primary" onClick={save} disabled={busy}>
          {busy ? "Saving..." : "Save changes"}
        </button>
        {msg ? <p className={msg.ok ? "sx-form-ok" : "sx-form-err"}>{msg.text}</p> : null}
      </div>
    </div>
  );
}
