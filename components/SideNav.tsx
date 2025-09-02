
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { VeridexLogo, OverviewIcon, ExpensesIcon, InvoicesIcon, ReportsIcon, AdvisorIcon, SettingsIcon, LogoutIcon } from './icons';

interface SideNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const navItems = [
  { name: 'Overview', icon: OverviewIcon },
  { name: 'Expenses', icon: ExpensesIcon },
  { name: 'Invoices', icon: InvoicesIcon },
  { name: 'Reports', icon: ReportsIcon },
  { name: 'Advisor Chat', icon: AdvisorIcon },
  { name: 'Settings', icon: SettingsIcon },
];

const SideNav: React.FC<SideNavProps> = ({ activeView, setActiveView }) => {
  const { user, logout } = useAuth();
  
  return (
    <div className="w-64 bg-brand-secondary h-screen flex flex-col p-4 border-r border-slate-700 fixed">
      <div className="flex items-center gap-2 px-4 mb-8">
        <VeridexLogo className="h-8 w-8 text-brand-accent" />
        <h1 className="text-2xl font-bold text-white">Veridex</h1>
      </div>

      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    setActiveView(item.name);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeView === item.name
                    ? 'bg-brand-accent text-white'
                    : 'text-brand-text-secondary hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <div className="p-4 rounded-lg bg-slate-800">
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="text-xs text-brand-text-secondary">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full mt-4 px-4 py-3 rounded-lg text-brand-text-secondary hover:bg-slate-700 hover:text-white transition-colors duration-200"
        >
          <LogoutIcon className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideNav;
