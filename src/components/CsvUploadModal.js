import React, { useState } from 'react';
import Papa from 'papaparse';
import { X, Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';

const CsvUploadModal = ({ onDataUpload, isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [tableName, setTableName] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setError(null);
    setSuccess(null);
    setPreviewData(null);
    
    const autoName = selectedFile.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_]/g, "_")
      .toLowerCase();
    
    setTableName(autoName);
    
    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      preview: 5,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError("Error parsing CSV: " + results.errors[0].message);
          setPreviewData(null);
        } else {
          setTotalRows(results.data.length);
          Papa.parse(selectedFile, {
            header: true,
            skipEmptyLines: true,
            complete: (fullResults) => {
              setTotalRows(fullResults.data.length);
            }
          });
          setPreviewData({
            columns: results.meta.fields,
            data: results.data,
            rowCount: results.data.length
          });
          setError(null);
        }
      },
      error: (err) => {
        setError("Failed to read file: " + err.message);
        setPreviewData(null);
      }
    });
  };

  const handleTableNameChange = (e) => {
    setTableName(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file");
      return;
    }
    
    if (!tableName.trim()) {
      setError("Please enter a table name");
      return;
    }
    
    if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(tableName)) {
      setError("Table name must start with a letter and contain only letters, numbers, and underscores");
      return;
    }
    
    setIsUploading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const results = await new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: resolve,
          error: reject
        });
      });
      
      if (results.errors.length > 0) {
        throw new Error("Error parsing CSV: " + results.errors[0].message);
      }
      
      await onDataUpload(tableName, results.data);
      
      setSuccess(`Successfully uploaded '${file.name}' as table '${tableName}'`);
      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setTableName('');
    setPreviewData(null);
    setTotalRows(0);
    setError(null);
    setSuccess(null);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[var(--color-bg-elevated)] shadow-2xl w-full max-w-2xl mx-4 p-6 rounded-xl border border-[var(--color-divider)] max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-start mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
              <FileSpreadsheet size={20} style={{ color: 'var(--color-accent)' }} />
            </div>
            <h2 className="text-xl font-semibold text-[var(--color-heading)]">Upload CSV Data</h2>
          </div>
          <button 
            onClick={() => { resetForm(); onClose(); }}
            className="p-1.5 rounded-lg text-[var(--color-text)] hover:text-[var(--color-heading)] hover:bg-[var(--color-bg)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 flex items-center gap-2 shrink-0" style={{ color: 'var(--color-error)' }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-[var(--color-success)]/10 border border-[var(--color-success)]/30 flex items-center gap-2 shrink-0" style={{ color: 'var(--color-success)' }}>
            <CheckCircle size={18} />
            {success}
          </div>
        )}
        
        {!isUploading && (
          <div className="space-y-5 overflow-y-auto flex-1">
            <div className="shrink-0">
              <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">
                Select CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-divider)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)] transition-all"
              />
            </div>
            
            {file && (
              <div className="shrink-0">
                <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">
                  Table Name
                </label>
                <input
                  type="text"
                  value={tableName}
                  onChange={handleTableNameChange}
                  placeholder="Enter table name"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-divider)] bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)] transition-all"
                />
              </div>
            )}
            
            {previewData && (
              <div className="shrink-0">
                <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">
                  Preview (showing first 5 of {totalRows} rows)
                </label>
                <div className="overflow-x-auto rounded-lg border border-[var(--color-divider)] max-h-48 overflow-y-auto">
                  <table className="min-w-full border-collapse">
                    <thead className="sticky top-0">
                      <tr>
                        {previewData.columns.map((col, index) => (
                          <th 
                            key={index} 
                            className="px-4 py-2.5 text-left text-xs font-semibold bg-[var(--color-bg)] text-[var(--color-heading)] border-b border-r border-[var(--color-divider)] uppercase tracking-wider shrink-0"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.data.map((row, rowIndex) => (
                        <tr 
                          key={rowIndex} 
                          className={rowIndex % 2 === 1 ? 'bg-[var(--color-bg)]' : ''}
                        >
                          {previewData.columns.map((col, colIndex) => (
                            <td 
                              key={colIndex} 
                              className="px-4 py-2 text-xs text-[var(--color-text)] border-b border-r border-[var(--color-divider)] shrink-0 max-w-[200px] truncate"
                            >
                              {row[col] !== null && row[col] !== undefined ? row[col] : ''}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3 pt-2 shrink-0">
              <button 
                onClick={() => { resetForm(); onClose(); }}
                className="px-5 py-2.5 text-sm font-semibold rounded-lg text-[var(--color-text)] hover:text-[var(--color-heading)] hover:bg-[var(--color-bg)] transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpload}
                disabled={!file || !tableName}
                className="btn-primary px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload size={16} />
                Upload
              </button>
            </div>
          </div>
        )}
        
        {isUploading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-divider)] text-[var(--color-heading)]">
              <div className="w-5 h-5 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
              Uploading...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvUploadModal;
