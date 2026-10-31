import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { HealthcareTexture } from '../../components/common/HealthcareTexture';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StaffLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const [email, setEmail] = useState('anita.nursing@pulsen-care.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      switchRole('staff');
      navigate('/staff/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <HealthcareTexture type="micro-dot-mesh" opacity={0.04} />

      <Card className="w-full max-w-md bg-white border-slate-200 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <img
            src="/assets/brand/pulse-n-care/pulse-n-care-logo-stacked.png"
            alt="Pulse n Care"
            className="h-16 w-auto mx-auto object-contain"
          />
          <Badge variant="teal" size="md">Staff Employee Duty Portal</Badge>
          <h1 className="text-xl font-black text-slate-900 mt-2">Employee Portal Sign In</h1>
          <p className="text-xs text-slate-500">Access your assigned care duties, patient details & turn-by-turn routes.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Staff Login Email / Employee ID *"
            placeholder="anita.nursing@pulsen-care.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Input
            label="Password *"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-mono">PNC-EMP-0012</span>
            <button
              type="button"
              onClick={() => navigate('/staff/first-login')}
              className="font-bold text-brand-teal hover:underline"
            >
              First Login Setup?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-teal hover:bg-brand-teal-hover text-white font-black text-sm h-11 rounded-full shadow-md mt-2"
          >
            {isLoading ? 'Signing In...' : 'Sign In to Duty Portal'} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Internal Managed Workforce Security
          </p>
        </div>
      </Card>
    </div>
  );
};
