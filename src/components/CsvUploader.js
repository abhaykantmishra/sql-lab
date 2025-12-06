import React, { useState } from 'react';
import Papa from 'papaparse';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const CsvUploader = ({ onDataUpload }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);
        setError(null);
        setSuccess(null);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                try {
                    if (results.errors.length > 0) {
                        throw new Error("Error parsing CSV: " + results.errors[0].message);
                    }

                    const tableName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_]/g, "_");

                    await onDataUpload(tableName, results.data);

                    setSuccess(`Successfully uploaded '${file.name}' as table '${tableName}'`);
                    setTimeout(() => setSuccess(null), 3000);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsUploading(false);
                    // Reset input
                    event.target.value = '';
                }
            },
            error: (err) => {
                setError("Failed to read file: " + err.message);
                setIsUploading(false);
            }
        });
    };

    return (
        <div className="flex items-center gap-2">
            <label className={`
        flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors
        ${isUploading
                    ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-500'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300'}
      `}>
                {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                <span>{isUploading ? 'Uploading...' : 'Upload CSV'}</span>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                />
            </label>

            {error && (
                <div className="text-red-500 text-xs flex items-center gap-1 animate-in fade-in slide-in-from-left-2">
                    <AlertCircle size={14} />
                    <span className="max-w-[200px] truncate" title={error}>{error}</span>
                </div>
            )}

            {success && (
                <div className="text-green-600 text-xs flex items-center gap-1 animate-in fade-in slide-in-from-left-2">
                    <CheckCircle size={14} />
                    <span className="max-w-[200px] truncate" title={success}>{success}</span>
                </div>
            )}
        </div>
    );
};

export default CsvUploader;
