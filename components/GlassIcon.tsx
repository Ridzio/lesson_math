
import React from 'react';

interface GlassIconProps {
  type: 'water' | 'juice';
  className?: string;
}

const GlassIcon: React.FC<GlassIconProps> = ({ type, className = "w-12 h-12" }) => {
  const color = type === 'water' ? '#bae6fd' : '#f87171';
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M19 4H5L6 20C6 21.1046 6.89543 22 8 22H16C17.1046 22 18 21.1046 18 20L19 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M6 10H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 10L17.5 18H6.5L6 10H18Z" fill={color} />
      <path d="M8 2H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};

export default GlassIcon;
