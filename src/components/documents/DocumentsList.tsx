'use client'

import { useState } from 'react'
import { DocumentCard } from '@/components/documents/DocumentCard'
import { PDFViewer } from '@/components/documents/PDFViewer'
import { FileText } from 'lucide-react'
import type { Document } from '@/types/document'
import { categories, documents } from '@/data/documents' // Import depuis data/documents

export const DocumentsList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('pamf')
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)

  // Filtre les documents par catégorie active
  const filteredDocs = documents.filter(doc => doc.category === activeCategory)

  return (
    <div className="animate-slide-up">
      {/* Category tabs */}
      <div className="flex gap-2 mb-8 sm:mb-12 pb-2 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300
              after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
              after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300
              hover:after:w-full font-sans
              ${
                activeCategory === category.id
                  ? 'text-primary after:w-full'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-neutral-50 dark:hover:bg-neutral-900'
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Liste des documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredDocs.map((doc, index) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onClick={() => setSelectedDoc(doc)}
            delay={index * 0.05}
          />
        ))}
      </div>

      {/* Message si vide */}
      {filteredDocs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
            <FileText className="w-8 h-8 text-neutral-400" strokeWidth={1} />
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg font-sans">
            Aucun document disponible dans cette catégorie
          </p>
        </div>
      )}

      {/* Viewer PDF Modal */}
      {selectedDoc && (
        <PDFViewer
          document={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  )
}