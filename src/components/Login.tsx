import React, { useState } from "react";
import { motion } from "motion/react";
import { api, toast } from "../utils/api";
import { KeyRound, User as UserIcon, Shield, GraduationCap, Eye, EyeOff } from "lucide-react";

interface LoginProps {
  onLoginSuccess: (user: any, token: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Quick credentials fill helper
  const handleQuickLogin = (role: string) => {
    if (role === "admin") {
      setUsername("admin");
      setPassword("admin123");
    } else if (role === "guru") {
      setUsername("guru1");
      setPassword("guru123");
    } else if (role === "kepsek") {
      setUsername("kepsek");
      setPassword("kepsek123");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.show("Silakan masukkan username dan password!", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password });
      toast.show(`Selamat datang kembali, ${res.user.nama}!`, "success");
      onLoginSuccess(res.user, res.token);
    } catch (err: any) {
      toast.show(err.message || "Gagal masuk, periksa kembali username & password!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Grid Decor */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />

      {/* Decorative Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 right-20 w-82 h-82 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-200 mb-4 ring-8 ring-blue-50">
            <span className="material-symbols-outlined text-3xl">school</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">SIA-MIS</h2>
          <p className="mt-2 text-sm text-slate-600">
            Sistem Informasi Absensi Siswa MI
          </p>
          <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-xs font-medium text-blue-700 border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Data Tersinkron & Aman
          </div>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white py-8 px-4 shadow-xl shadow-slate-100 border border-slate-100 rounded-3xl sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                Username / NIP
              </label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <UserIcon size={18} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 placeholder-slate-400"
                  placeholder="Masukkan username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Kata Sandi
              </label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 placeholder-slate-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-100 active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memverifikasi...
                  </div>
                ) : (
                  "Masuk ke Aplikasi"
                )}
              </button>
            </div>
          </form>

          {/* Quick Login Helper Panel */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
              Akses Cepat Pengujian (Demo)
            </h3>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              <button
                onClick={() => handleQuickLogin("admin")}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-blue-50/50 border border-blue-100 hover:bg-blue-100/50 transition-all duration-200 active:scale-95 group"
              >
                <Shield size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="mt-1 text-[10px] font-semibold text-blue-700">Admin</span>
              </button>

              <button
                onClick={() => handleQuickLogin("guru")}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 hover:bg-emerald-100/50 transition-all duration-200 active:scale-95 group"
              >
                <GraduationCap size={18} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="mt-1 text-[10px] font-semibold text-emerald-700">Guru</span>
              </button>

              <button
                onClick={() => handleQuickLogin("kepsek")}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-amber-50/50 border border-amber-100 hover:bg-amber-100/50 transition-all duration-200 active:scale-95 group"
              >
                <UserIcon size={18} className="text-amber-600 group-hover:scale-110 transition-transform" />
                <span className="mt-1 text-[10px] font-semibold text-amber-700">Kepsek</span>
              </button>
            </div>
            
            {/* Display Credentials Details for quick access */}
            <div className="mt-3.5 px-3 py-2 bg-slate-50 rounded-xl text-[10px] text-slate-500 font-mono text-center">
              Password: <span className="font-semibold text-slate-700">username123</span> (Contoh: <span className="font-semibold text-slate-700">admin123</span>)
            </div>
          </div>
        </motion.div>
      </div>

      <div className="text-center mt-8 text-xs text-slate-400 z-10">
        SIA-MIS &copy; 2026 • Dirancang untuk Kecepatan & Keamanan
      </div>
    </div>
  );
}
