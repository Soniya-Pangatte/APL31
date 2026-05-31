import React from 'react';
import { Heart, Globe, MessageSquare, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * Site-wide footer with platform links and social media icons.
 * Hidden for NGO users who have their own dashboard layout.
 */
const Footer = () => {
  const { user } = useAuth();
  
  if (user?.role === 'ngo') {
    return null;
  }

  return (
    <footer className="bg-black text-zinc-400 py-12 px-4 mt-auto border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6 text-white">
            <Heart className="h-6 w-6 text-white" fill="currentColor" />
            <span className="font-bold text-xl tracking-tight">
              Disaster<span className="text-zinc-500">Relief</span>
            </span>
          </div>
          <p className="text-zinc-500 max-w-sm mb-6 leading-relaxed">
            Revolutionizing humanitarian aid through blockchain transparency. Every donation is tracked, every expense is verified, and every life matters.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Visit our website" className="text-zinc-400 hover:text-white transition-colors"><Globe size={20} /></a>
            <a href="#" aria-label="Message us" className="text-zinc-400 hover:text-white transition-colors"><MessageSquare size={20} /></a>
            <a href="#" aria-label="Email us" className="text-zinc-400 hover:text-white transition-colors"><Mail size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Platform</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Active Campaigns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Transparency Ledger</a></li>
            <li><a href="#" className="hover:text-white transition-colors">NGO Directory</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Support</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-zinc-900 mt-12 pt-8 text-center text-xs text-zinc-600">
        <p>&copy; {new Date().getFullYear()} Disaster Relief Transparent Donation Network. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
