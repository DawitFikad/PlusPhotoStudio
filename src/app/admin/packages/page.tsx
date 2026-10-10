"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Edit2,
} from "lucide-react";
import { StudioPackageRecord } from "@/lib/booking-store";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<StudioPackageRecord[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editName, setEditName] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await fetch("/api/admin/packages");
        const data = await res.json();
        if (data.packages) setPackages(data.packages);
      } catch (err) {
        console.error(err);
      }
    }
    loadPackages();
  }, []);

  const startEdit = (pkg: StudioPackageRecord) => {
    setEditingId(pkg.id);
    setEditPrice(pkg.price);
    setEditName(pkg.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSavePackage = async (id: string, isDraft?: boolean) => {
    setSaving(true);
    setFeedback(null);

    try {
      const payload: Record<string, unknown> = { id };
      if (editingId === id) {
        payload.price = Number(editPrice);
        payload.name = editName;
      }
      if (isDraft !== undefined) {
        payload.isDraft = isDraft;
      }

      const res = await fetch("/api/admin/packages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPackages((prev) =>
          prev.map((p) => (p.id === id ? data.package : p))
        );
        setEditingId(null);
        setFeedback("Package updated successfully in database.");
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      setFeedback("Failed to update package.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D9C7B2]/10">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-[#B96F52] block mb-1">
            Studio Financial Catalog
          </span>
          <h1
            className="text-3xl font-light text-[#F6F0E8]"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            Manage Packages & ETB Rates
          </h1>
        </div>

        <div className="p-3 bg-[#211F1D] border border-[#B96F52]/30 rounded-sm text-xs text-[#D9C7B2]">
          Currency: <strong className="text-[#F6F0E8]">ETB (Ethiopian Birr)</strong>
        </div>
      </div>

      {feedback && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-800/50 rounded-sm flex items-center gap-3 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{feedback}</span>
        </div>
      )}

      {/* ── Notice regarding Draft vs Approved ── */}
      <div className="p-4 bg-[#191817] border-l-2 border-[#B96F52] rounded-r-sm">
        <p className="text-xs text-[#D9C7B2]/80 leading-relaxed font-light">
          <strong className="text-[#F6F0E8] font-medium">Owner Rate Governance:</strong> Packages
          marked as <span className="text-amber-400 font-mono">DRAFT</span> will show an advisory disclaimer
          on public cards. Once the studio director verifies rates, click &quot;Approve Live Rate&quot; to mark
          them as officially published studio rates.
        </p>
      </div>

      {/* ── Packages Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isEditing = editingId === pkg.id;

          return (
            <div
              key={pkg.id}
              className="p-6 bg-[#191817] border border-[#D9C7B2]/15 rounded-sm flex flex-col justify-between hover:border-[#B96F52]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#B96F52]">
                    {pkg.serviceSlug}
                  </span>
                  <button
                    onClick={() => handleSavePackage(pkg.id, !pkg.isDraft)}
                    className={`px-2 py-0.5 text-[9px] uppercase font-mono tracking-wider rounded-sm border ${
                      pkg.isDraft
                        ? "bg-amber-950/40 border-amber-800/60 text-amber-300"
                        : "bg-emerald-950/40 border-emerald-800/60 text-emerald-300"
                    }`}
                  >
                    {pkg.isDraft ? "Draft Sample" : "Approved Live"}
                  </button>
                </div>

                {isEditing ? (
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#D9C7B2]/60 mb-1">
                        Package Name
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#211F1D] border border-[#D9C7B2]/20 text-xs text-[#F6F0E8] rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#D9C7B2]/60 mb-1">
                        Rate (ETB)
                      </label>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-[#211F1D] border border-[#D9C7B2]/20 text-xs font-mono text-[#F6F0E8] rounded-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h3
                      className="text-xl font-light text-[#F6F0E8] mb-1"
                      style={{ fontFamily: "var(--font-bodoni), serif" }}
                    >
                      {pkg.name}
                    </h3>
                    <div className="text-2xl font-serif text-[#F6F0E8] mb-3">
                      ETB {pkg.price.toLocaleString()}
                    </div>
                  </>
                )}

                <p className="text-xs text-[#D9C7B2]/70 leading-relaxed font-light mb-4">
                  {pkg.description}
                </p>

                <ul className="space-y-1.5 border-t border-[#D9C7B2]/10 pt-3 mb-6">
                  {pkg.highlights.map((h, i) => (
                    <li key={i} className="text-[11px] text-[#D9C7B2]/80 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B96F52]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#D9C7B2]/10">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSavePackage(pkg.id)}
                      disabled={saving}
                      className="flex-1 py-2 bg-[#B96F52] text-[#191817] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#D4957C]"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-2 bg-[#252321] text-xs text-[#D9C7B2] rounded-sm hover:bg-[#2A2826]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(pkg)}
                    className="w-full py-2 bg-[#211F1D] border border-[#D9C7B2]/20 text-xs text-[#F6F0E8] uppercase tracking-wider rounded-sm hover:border-[#B96F52] transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#B96F52]" />
                    <span>Edit Rate & Details</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
