
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { redirectToCheckout } from '../services/stripe';
import { PLANS } from '../constants';

const Settings: React.FC = () => {
    const { user } = useAuth();
    const proPlanMonth = PLANS.find(p => p.name === 'Pro')?.priceIdMonth;
    const basicPlanMonth = PLANS.find(p => p.name === 'Basic')?.priceIdMonth;

    const handleChangePlan = () => {
        const targetPriceId = user?.subscription === 'Pro' ? basicPlanMonth : proPlanMonth;
        if(targetPriceId){
            redirectToCheckout(targetPriceId);
        } else {
            alert('Error: Plan not found.');
        }
    };
    
    const handleCancel = () => {
        // In a real app, this would call a backend endpoint to manage the subscription in Stripe.
        alert('This is a demo. In a real app, this would take you to a Stripe billing portal to cancel your subscription.');
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
            
            {/* Profile Settings */}
            <div className="bg-brand-secondary rounded-xl border border-slate-700 p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-text-secondary mb-2">Full Name</label>
                        <input type="text" name="name" id="name" defaultValue={user?.name} className="w-full bg-slate-800 text-white placeholder-brand-text-secondary rounded-lg py-2 px-4 border border-slate-600 focus:ring-2 focus:ring-brand-accent focus:outline-none" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-text-secondary mb-2">Email Address</label>
                        <input type="email" name="email" id="email" defaultValue={user?.email} className="w-full bg-slate-800 text-white placeholder-brand-text-secondary rounded-lg py-2 px-4 border border-slate-600 focus:ring-2 focus:ring-brand-accent focus:outline-none" />
                    </div>
                    <div className="pt-2">
                        <button type="submit" onClick={(e) => { e.preventDefault(); alert("Profile updated (demo).") }} className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Changes</button>
                    </div>
                </form>
            </div>
            
            {/* Billing Settings */}
            <div className="bg-brand-secondary rounded-xl border border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Billing & Subscription</h2>
                <div className="bg-slate-800 p-6 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div>
                            <p className="text-brand-text-secondary">Current Plan</p>
                            <p className="text-xl font-bold text-white">{user?.subscription} Plan</p>
                        </div>
                        <div className="flex gap-2 mt-4 sm:mt-0">
                            <button onClick={handleChangePlan} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                {user?.subscription === 'Pro' ? 'Downgrade to Basic' : 'Upgrade to Pro'}
                            </button>
                            <button onClick={handleCancel} className="bg-red-600/80 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Cancel Subscription
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
