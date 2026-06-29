"use client";

import { useState } from "react";
import { useAdminStore } from "@/store/adminStore";
import InteractiveButton from "@/components/global/InteractiveButton";

export default function AdminSettingsPage() {
  const settings = useAdminStore((state) => state.settings);
  const updateSettings = useAdminStore((state) => state.updateSettings);

  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full bg-[#111] border border-brand-border-strong rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors";

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-semibold text-white">Store Settings</h1>
      </div>

      <div className="bg-brand-card p-8 rounded-2xl border border-brand-border-hairline">
        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-heading text-lg font-medium text-white mb-4">General Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-brand-muted mb-2">Store Name</label>
                  <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm text-brand-muted mb-2">Instagram Handle</label>
                  <input type="text" name="instagramHandle" value={formData.instagramHandle} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm text-brand-muted mb-2">Location Text</label>
                  <input type="text" name="locationText" value={formData.locationText} onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-lg font-medium text-white mb-4">Appearance & Features</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-brand-muted mb-2">Footer Text</label>
                  <textarea name="footerText" value={formData.footerText} onChange={handleChange} className={`${inputClass} resize-none h-24`} />
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <input type="checkbox" name="enableBackgroundAnimation" checked={formData.enableBackgroundAnimation} onChange={handleChange} className="w-5 h-5 accent-white" />
                  <label className="text-sm text-white">Enable Hero Background Noise</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" name="enable3DCarousel" checked={formData.enable3DCarousel} onChange={handleChange} className="w-5 h-5 accent-white" />
                  <label className="text-sm text-white">Show 3D Carousel on Home Page</label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-brand-border-hairline flex items-center space-x-6">
            <InteractiveButton type="submit" variant="admin">Save Changes</InteractiveButton>
            {saved && <span className="text-accent-green font-medium text-sm">Settings saved successfully!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
