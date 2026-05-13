'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { DEMO_CREDENTIALS } from '@/lib/mockData';
import {
  Eye, EyeOff, Loader2, AlertCircle, CheckCircle,
  Copy, ChevronRight, Shield, Wrench, User, LogIn, ArrowLeft
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


// BACKEND INTEGRATION POINT: Replace mock auth with GraphQL mutation login(email, password)
// On success: store JWT in httpOnly cookie or localStorage, decode role, redirect

type RoleSelection = 'Technician' | 'Client' | null;

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const ROLE_OPTIONS = [
  {
    role: 'Technician' as RoleSelection,
    icon: Wrench,
    label: 'Technician',
    desc: 'Access your assigned jobs and update status on site',
    color: '#818CF8',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.3)',
  },
  {
    role: 'Client' as RoleSelection,
    icon: User,
    label: 'Client',
    desc: 'Track your service requests and view job progress',
    color: '#A78BFA',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.3)',
  },
];

export default function LoginPageContent() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleSelection>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<LoginFormData>({
    defaultValues: { remember: false }
  });

  const watchedEmail = watch('email');

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError('');
    // BACKEND INTEGRATION POINT: GraphQL mutation login(email: data.email, password: data.password)
    await new Promise(r => setTimeout(r, 1100));
    const match = DEMO_CREDENTIALS.find(
      c => c.email === data.email && c.password === data.password
    );
    if (!match) {
      setIsLoading(false);
      setAuthError('Invalid credentials — use the demo accounts below to sign in');
      return;
    }
    // Validate role matches selection (non-admin)
    if (selectedRole && match.role !== selectedRole && match.role !== 'Admin') {
      setIsLoading(false);
      setAuthError(`These credentials belong to a ${match.role} account, not ${selectedRole}`);
      return;
    }
    setIsLoading(false);
    router.push(match.redirectTo);
  };

  const handleAutofill = (email: string, password: string) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', password, { shouldValidate: true });
    setAuthError('');
  };

  const handleCopy = async (text: string, fieldId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const getRoleIcon = (role: string) => {
    if (role === 'Admin') return Shield;
    if (role === 'Technician') return Wrench;
    return User;
  };

  const getRoleColor = (role: string) => {
    if (role === 'Admin') return 'var(--primary)';
    if (role === 'Technician') return '#818CF8';
    return '#A78BFA';
  };

  // Filter demo credentials based on selected role
  const filteredCredentials = selectedRole
    ? DEMO_CREDENTIALS.filter(c => c.role === selectedRole)
    : DEMO_CREDENTIALS;

  // Admin always goes straight to login form (no role selector)
  const showRoleSelector = selectedRole === null;
  const showAdminLink = selectedRole === null;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--background)' }}>
      {/* Left panel — Branding */}
      <div className="hidden lg:flex lg:w-[520px] xl:w-[600px] shrink-0 flex-col relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0F1C35 0%, #1B3A6B 60%, #1a4a6e 100%)' }}>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
            style={{ backgroundColor: 'var(--accent)' }} />
          <div className="absolute bottom-20 -left-24 w-80 h-80 rounded-full opacity-5"
            style={{ backgroundColor: 'var(--accent)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03] border border-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full opacity-[0.04] border border-white" />
        </div>

        <div className="relative z-10 flex flex-col h-full px-12 py-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <AppLogo size={40} />
            <span className="text-xl font-bold text-white tracking-tight">FieldSync</span>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{ backgroundColor: 'rgba(14,165,160,0.2)', border: '1px solid rgba(14,165,160,0.3)' }}>
                <span className="live-dot" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>SwiftFix Facilities Management</span>
              </div>
              <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                Field Operations,<br />
                <span style={{ color: 'var(--accent)' }}>Centralised.</span>
              </h1>
              <p className="text-base text-white/60 leading-relaxed max-w-sm">
                Replace WhatsApp coordination and spreadsheets with a real-time operations platform built for 40+ technicians across Accra.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-4">
              {[
                { icon: '📍', title: 'Verified site locations', desc: 'Every job has confirmed coordinates and contact details' },
                { icon: '⚡', title: 'Real-time status updates', desc: 'Admins see live job progress as technicians update on site' },
                { icon: '🔔', title: 'Automatic client notifications', desc: 'Clients informed instantly when their job status changes' },
              ].map(f => (
                <div key={`feature-${f.title}`} className="flex items-start gap-4">
                  <span className="text-xl shrink-0">{f.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{f.title}</p>
                    <p className="text-xs text-white/50 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-xs text-white/30">© 2026 SwiftFix Facilities Management Ltd. · Accra, Ghana</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <AppLogo size={36} />
            <span className="text-lg font-bold text-foreground">FieldSync</span>
          </div>

          {/* ── ROLE SELECTOR ── */}
          {showRoleSelector ? (
            <div className="animate-slide-up">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground">Welcome back</h2>
                <p className="text-sm text-muted-foreground mt-1.5">Select your role to continue to your dashboard</p>
              </div>

              <div className="space-y-3 mb-6">
                {ROLE_OPTIONS.map(opt => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.role}
                      type="button"
                      onClick={() => setSelectedRole(opt.role)}
                      className="w-full text-left p-4 rounded-xl border-2 transition-all hover:shadow-sm group"
                      style={{ borderColor: opt.border, backgroundColor: opt.bg }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${opt.color}20` }}>
                          <Icon size={20} style={{ color: opt.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground">{opt.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Admin separator */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-medium">Admin access</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <button
                type="button"
                onClick={() => setSelectedRole('Admin' as unknown as RoleSelection)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all hover:bg-muted/40"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(14,165,160,0.1)' }}>
                  <Shield size={16} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground">Admin</p>
                  <p className="text-xs text-muted-foreground">Full platform oversight and management</p>
                </div>
                <ChevronRight size={14} className="text-muted-foreground" />
              </button>
            </div>
          ) : (
            /* ── LOGIN FORM ── */
            <div className="animate-slide-up">
              {/* Back button + role indicator */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => { setSelectedRole(null); setAuthError(''); }}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Back to role selection"
                >
                  <ArrowLeft size={16} className="text-muted-foreground" />
                </button>
                <div className="flex items-center gap-2">
                  {selectedRole === 'Technician' && <Wrench size={14} style={{ color: '#818CF8' }} />}
                  {selectedRole === 'Client' && <User size={14} style={{ color: '#A78BFA' }} />}
                  {(selectedRole as unknown as string) === 'Admin' && <Shield size={14} style={{ color: 'var(--accent)' }} />}
                  <span className="text-sm font-semibold"
                    style={{ color: selectedRole === 'Technician' ? '#818CF8' : selectedRole === 'Client' ? '#A78BFA' : 'var(--accent)' }}>
                    {selectedRole as unknown as string} Sign In
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground">Sign in to your account</h2>
                <p className="text-sm text-muted-foreground mt-1.5">Enter your SwiftFix credentials to continue</p>
              </div>

              {/* Login form */}
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                {/* Email */}
                <div>
                  <label className="label-text" htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your.name@swiftfix.gh"
                    className={`input-field ${errors.email ? 'error' : ''}`}
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' }
                    })}
                  />
                  {errors.email && (
                    <p className="error-text"><AlertCircle size={11} />{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="label-text mb-0" htmlFor="password">Password</label>
                    <button type="button" className="text-xs font-medium hover:underline"
                      style={{ color: 'var(--accent)' }}>
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className={`input-field pr-10 ${errors.password ? 'error' : ''}`}
                      {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="error-text"><AlertCircle size={11} />{errors.password.message}</p>
                  )}
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 rounded border-border"
                    {...register('remember')}
                  />
                  <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer select-none">
                    Keep me signed in for 30 days
                  </label>
                </div>

                {/* Auth error */}
                {authError && (
                  <div className="flex items-start gap-2 p-3 rounded-lg border animate-slide-up"
                    style={{ backgroundColor: '#FEF2F2', borderColor: '#FECACA' }}>
                    <AlertCircle size={14} className="shrink-0 mt-0.5" style={{ color: '#DC2626' }} />
                    <p className="text-xs font-medium" style={{ color: '#DC2626' }}>{authError}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full h-11 text-sm justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      <LogIn size={16} />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-medium">Demo Accounts</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Demo credentials table */}
              <div className="card-elevated overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/40">
                  <p className="text-xs font-semibold text-foreground">Click any row to autofill credentials</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {selectedRole === 'Admin' ? 'Admin account' : `${selectedRole as unknown as string} accounts`}
                  </p>
                </div>
                <div className="divide-y divide-border">
                  {filteredCredentials.map((cred) => {
                    const RoleIcon = getRoleIcon(cred.role);
                    const isSelected = watchedEmail === cred.email;
                    return (
                      <button
                        key={`cred-${cred.role}`}
                        type="button"
                        onClick={() => handleAutofill(cred.email, cred.password)}
                        className={`w-full px-4 py-3 text-left transition-all hover:bg-muted/60 ${isSelected ? 'bg-muted' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${getRoleColor(cred.role)}15` }}>
                            <RoleIcon size={15} style={{ color: getRoleColor(cred.role) }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground">{cred.role}</span>
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                                style={{ backgroundColor: `${getRoleColor(cred.role)}15`, color: getRoleColor(cred.role) }}>
                                {cred.name}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                                  style={{ backgroundColor: 'var(--status-completed-bg)', color: 'var(--status-completed)' }}>
                                  Selected
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{cred.email}</p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <div className="tooltip-container">
                              <span className="tooltip-label">Copy email</span>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleCopy(cred.email, `email-${cred.role}`); }}
                                className="p-1.5 rounded hover:bg-muted transition-colors"
                                aria-label="Copy email"
                              >
                                {copiedField === `email-${cred.role}`
                                  ? <CheckCircle size={12} style={{ color: 'var(--status-completed)' }} />
                                  : <Copy size={12} className="text-muted-foreground" />
                                }
                              </button>
                            </div>
                            <ChevronRight size={14} className="text-muted-foreground" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="px-4 py-2.5 bg-muted/40 border-t border-border">
                  <p className="text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground">Password pattern:</span> Role@SwiftFix2026 (Admin/Technician) · Client@AccraMall26 (Client)
                  </p>
                </div>
              </div>

              {/* Footer note */}
              <p className="text-center text-xs text-muted-foreground mt-6">
                By signing in, you agree to SwiftFix&apos;s{' '}
                <span className="hover:underline cursor-pointer" style={{ color: 'var(--accent)' }}>Terms of Service</span>
                {' '}and{' '}
                <span className="hover:underline cursor-pointer" style={{ color: 'var(--accent)' }}>Privacy Policy</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}