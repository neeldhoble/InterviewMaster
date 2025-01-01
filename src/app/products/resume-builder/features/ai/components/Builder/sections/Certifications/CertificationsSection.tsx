"use client";

import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CertificationItem {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

interface CertificationsSectionProps {
  data: CertificationItem[];
  onChange: (data: CertificationItem[]) => void;
}

const popularCertifications = [
  { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services' },
  { name: 'Google Cloud Professional', issuer: 'Google Cloud' },
  { name: 'Microsoft Azure Administrator', issuer: 'Microsoft' },
  { name: 'Certified Kubernetes Administrator', issuer: 'CNCF' },
  { name: 'Certified Information Systems Security Professional', issuer: 'ISC²' },
  { name: 'Project Management Professional (PMP)', issuer: 'PMI' },
  { name: 'ITIL Foundation', issuer: 'Axelos' },
  { name: 'Certified Scrum Master', issuer: 'Scrum Alliance' }
];

export function CertificationsSection({ data = [], onChange }: CertificationsSectionProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        url: ''
      }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof CertificationItem, value: string) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    onChange(newData);
  };

  const handleQuickAdd = (cert: typeof popularCertifications[0]) => {
    onChange([
      ...data,
      {
        name: cert.name,
        issuer: cert.issuer,
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        url: ''
      }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Quick Add Popular Certifications */}
      <Card className="p-6 bg-[#1A2430]/60 border-[#2A3441]">
        <Label className="text-white mb-3 block">Popular Certifications</Label>
        <div className="flex flex-wrap gap-2">
          {popularCertifications.map((cert) => (
            <Button
              key={cert.name}
              variant="outline"
              className="bg-[#141C23] text-gray-300 hover:bg-blue-500/20 hover:text-blue-300 border-[#2A3441]"
              onClick={() => handleQuickAdd(cert)}
            >
              <Plus className="w-4 h-4 mr-2" />
              {cert.name}
            </Button>
          ))}
        </div>
      </Card>

      {data.map((cert, index) => (
        <Card key={index} className="p-6 bg-[#1A2430]/60 border-[#2A3441] relative group">
          <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleRemove(index)}
              className="rounded-full w-8 h-8 bg-red-500/80 hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`} className="text-white">Certification Name</Label>
              <Input
                id={`name-${index}`}
                value={cert.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                placeholder="e.g., AWS Solutions Architect"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`issuer-${index}`} className="text-white">Issuing Organization</Label>
              <Input
                id={`issuer-${index}`}
                value={cert.issuer}
                onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                placeholder="e.g., Amazon Web Services"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor={`issueDate-${index}`} className="text-white">Issue Date</Label>
              <Input
                id={`issueDate-${index}`}
                value={cert.issueDate}
                onChange={(e) => handleChange(index, 'issueDate', e.target.value)}
                placeholder="MM/YYYY"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`expiryDate-${index}`} className="text-white">Expiry Date (Optional)</Label>
              <Input
                id={`expiryDate-${index}`}
                value={cert.expiryDate}
                onChange={(e) => handleChange(index, 'expiryDate', e.target.value)}
                placeholder="MM/YYYY or No Expiry"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor={`credentialId-${index}`} className="text-white">Credential ID (Optional)</Label>
              <Input
                id={`credentialId-${index}`}
                value={cert.credentialId}
                onChange={(e) => handleChange(index, 'credentialId', e.target.value)}
                placeholder="Enter credential ID"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`url-${index}`} className="text-white">URL (Optional)</Label>
              <Input
                id={`url-${index}`}
                value={cert.url}
                onChange={(e) => handleChange(index, 'url', e.target.value)}
                placeholder="https://..."
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button
        onClick={handleAdd}
        className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-white border border-[#2A3441]"
      >
        <Award className="w-4 h-4 mr-2" />
        Add Certification
      </Button>
    </div>
  );
}
