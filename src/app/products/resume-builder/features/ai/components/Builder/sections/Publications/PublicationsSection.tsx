"use client";

import React from 'react';
import { Plus, Trash2, BookOpen, Link as LinkIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PublicationItem {
  title: string;
  authors: string;
  publisher: string;
  date: string;
  doi: string;
  url: string;
  type: string;
  abstract: string;
  citation: string;
}

interface PublicationsSectionProps {
  data: PublicationItem[];
  onChange: (data: PublicationItem[]) => void;
}

const publicationTypes = [
  'Journal Article',
  'Conference Paper',
  'Book Chapter',
  'Book',
  'Technical Report',
  'Patent',
  'White Paper',
  'Blog Post',
  'Other'
];

export function PublicationsSection({ data = [], onChange }: PublicationsSectionProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        title: '',
        authors: '',
        publisher: '',
        date: '',
        doi: '',
        url: '',
        type: '',
        abstract: '',
        citation: ''
      }
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof PublicationItem, value: string) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    onChange(newData);
  };

  const generateCitation = (index: number) => {
    const pub = data[index];
    const citation = `${pub.authors} (${pub.date}). ${pub.title}. ${pub.publisher}.`;
    handleChange(index, 'citation', citation);
  };

  return (
    <div className="space-y-6">
      {data.map((publication, index) => (
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
              <Label htmlFor={`title-${index}`} className="text-white">Title</Label>
              <Input
                id={`title-${index}`}
                value={publication.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                placeholder="Publication title"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`type-${index}`} className="text-white">Type</Label>
              <Select
                value={publication.type}
                onValueChange={(value) => handleChange(index, 'type', value)}
              >
                <SelectTrigger className="bg-[#141C23] border-[#2A3441] text-white">
                  <SelectValue placeholder="Select publication type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A2430] border-[#2A3441]">
                  {publicationTypes.map((type) => (
                    <SelectItem 
                      key={type} 
                      value={type}
                      className="text-white hover:bg-[#2A3441]"
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor={`authors-${index}`} className="text-white">Authors</Label>
            <Input
              id={`authors-${index}`}
              value={publication.authors}
              onChange={(e) => handleChange(index, 'authors', e.target.value)}
              placeholder="List of authors (e.g., Smith, J., Jones, M.)"
              className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor={`publisher-${index}`} className="text-white">Publisher/Journal</Label>
              <Input
                id={`publisher-${index}`}
                value={publication.publisher}
                onChange={(e) => handleChange(index, 'publisher', e.target.value)}
                placeholder="Publisher or journal name"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`date-${index}`} className="text-white">Publication Date</Label>
              <Input
                id={`date-${index}`}
                value={publication.date}
                onChange={(e) => handleChange(index, 'date', e.target.value)}
                placeholder="MM/YYYY"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor={`doi-${index}`} className="text-white">DOI</Label>
              <Input
                id={`doi-${index}`}
                value={publication.doi}
                onChange={(e) => handleChange(index, 'doi', e.target.value)}
                placeholder="Digital Object Identifier"
                className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`url-${index}`} className="text-white">URL</Label>
              <div className="relative">
                <Input
                  id={`url-${index}`}
                  value={publication.url}
                  onChange={(e) => handleChange(index, 'url', e.target.value)}
                  placeholder="https://..."
                  className="bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400 pl-9"
                />
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor={`abstract-${index}`} className="text-white">Abstract</Label>
            <Textarea
              id={`abstract-${index}`}
              value={publication.abstract}
              onChange={(e) => handleChange(index, 'abstract', e.target.value)}
              placeholder="Brief summary of the publication..."
              className="h-32 bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
            />
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor={`citation-${index}`} className="text-white">Citation</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => generateCitation(index)}
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
              >
                Generate Citation
              </Button>
            </div>
            <Textarea
              id={`citation-${index}`}
              value={publication.citation}
              onChange={(e) => handleChange(index, 'citation', e.target.value)}
              placeholder="Citation in your preferred format..."
              className="h-24 bg-[#141C23] border-[#2A3441] text-white placeholder:text-gray-400"
            />
          </div>
        </Card>
      ))}

      <Button
        onClick={handleAdd}
        className="w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-white border border-[#2A3441]"
      >
        <BookOpen className="w-4 h-4 mr-2" />
        Add Publication
      </Button>
    </div>
  );
}
