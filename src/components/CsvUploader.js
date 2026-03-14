import React, { useState } from 'react';
import CsvUploadModal from './CsvUploadModal';
import { Upload } from 'lucide-react';

const CsvUploader = ({ onDataUpload }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDataUpload = async (tableName, data) => {
        await onDataUpload(tableName, data);
    };

    return (
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg cursor-pointer transition-all bg-[var(--color-bg)] border border-[var(--color-divider)] text-[var(--color-heading)] hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-divider-dark)]"
            >
                <Upload size={16} />
                <span>Upload CSV</span>
            </button>
            
            <CsvUploadModal 
                onDataUpload={handleDataUpload}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default CsvUploader;
