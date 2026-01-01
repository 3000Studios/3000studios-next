'use client';

import {
    AlertCircle,
    CheckCircle,
    FileImage,
    FileText,
    Folder,
    Trash2,
    Upload,
    Video,
} from 'lucide-react';
import { useState } from 'react';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  destination: string;
  status: 'pending' | 'uploading' | 'complete' | 'error';
}

const DESTINATION_OPTIONS = [
  { value: '/public/images', label: '📷 Images (public/images)', icon: FileImage },
  { value: '/public/videos', label: '🎬 Videos (public/videos)', icon: Video },
  { value: '/public/assets', label: '📁 Assets (public/assets)', icon: Folder },
  { value: '/app/blog', label: '📝 Blog Posts (app/blog)', icon: FileText },
  { value: '/components', label: '🧩 Components (components)', icon: Folder },
  { value: '/lib', label: '📚 Library (lib)', icon: Folder },
  { value: '/styles', label: '🎨 Styles (styles)', icon: Folder },
];

export default function ContentUploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [destination, setDestination] = useState('/public/images');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>(
    'idle'
  );
  const [statusMessage, setStatusMessage] = useState('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const uploadFiles: UploadedFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      type: file.type,
      size: file.size,
      destination: destination,
      status: 'pending' as const,
    }));
    setFiles((prev) => [...prev, ...uploadFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploadStatus('uploading');
    setStatusMessage('Uploading files...');

    // Mark all as uploading
    setFiles((prev) => prev.map((f) => ({ ...f, status: 'uploading' as const })));

    // Simulate upload (in production this would call an API)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mark all as complete
    setFiles((prev) => prev.map((f) => ({ ...f, status: 'complete' as const })));
    setUploadStatus('success');
    setStatusMessage(`Successfully uploaded ${files.length} file(s) to ${destination}`);

    // Clear after 3 seconds
    setTimeout(() => {
      setFiles([]);
      setUploadStatus('idle');
      setStatusMessage('');
    }, 3000);
  };

  const updateFileDestination = (id: string, newDestination: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, destination: newDestination } : f)));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#D4AF37] mb-2">Content Upload</h1>
        <p className="text-gray-400">Upload files and specify where they should be placed</p>
      </div>

      {/* Status Message */}
      {uploadStatus !== 'idle' && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            uploadStatus === 'success'
              ? 'bg-green-900/30 border border-green-500/50'
              : uploadStatus === 'error'
                ? 'bg-red-900/30 border border-red-500/50'
                : 'bg-blue-900/30 border border-blue-500/50'
          }`}
        >
          {uploadStatus === 'success' ? (
            <CheckCircle className="text-green-400" size={20} />
          ) : uploadStatus === 'error' ? (
            <AlertCircle className="text-red-400" size={20} />
          ) : (
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          )}
          <span
            className={
              uploadStatus === 'success'
                ? 'text-green-200'
                : uploadStatus === 'error'
                  ? 'text-red-200'
                  : 'text-blue-200'
            }
          >
            {statusMessage}
          </span>
        </div>
      )}

      {/* Default Destination */}
      <div className="mb-6 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Default Destination for New Uploads
        </label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        >
          {DESTINATION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
          isDragging
            ? 'border-[#D4AF37] bg-[#D4AF37]/10'
            : 'border-gray-700 hover:border-[#D4AF37]/50'
        }`}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Upload className="mx-auto text-[#D4AF37] mb-4" size={48} />
        <h3 className="text-xl font-bold text-white mb-2">Drag & drop files here</h3>
        <p className="text-gray-400 mb-4">or click to browse</p>
        <p className="text-gray-500 text-sm">Supports: Images, Videos, Documents, Code files</p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Files to Upload ({files.length})</h3>
            <button
              onClick={handleUpload}
              disabled={uploadStatus === 'uploading'}
              className="px-6 py-2 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-all disabled:opacity-50"
            >
              {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload All'}
            </button>
          </div>

          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className={`p-4 bg-gray-900/50 border rounded-lg flex items-center gap-4 ${
                  file.status === 'complete'
                    ? 'border-green-500/50'
                    : file.status === 'error'
                      ? 'border-red-500/50'
                      : file.status === 'uploading'
                        ? 'border-blue-500/50'
                        : 'border-gray-800'
                }`}
              >
                {/* File Icon */}
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                  {file.type.startsWith('image/') ? (
                    <FileImage className="text-purple-400" size={20} />
                  ) : file.type.startsWith('video/') ? (
                    <Video className="text-red-400" size={20} />
                  ) : (
                    <FileText className="text-blue-400" size={20} />
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{file.name}</p>
                  <p className="text-gray-500 text-sm">{formatFileSize(file.size)}</p>
                </div>

                {/* Destination Selector */}
                <select
                  value={file.destination}
                  onChange={(e) => updateFileDestination(file.id, e.target.value)}
                  disabled={file.status === 'uploading' || file.status === 'complete'}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50"
                >
                  {DESTINATION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* Status */}
                <div className="w-20 text-center">
                  {file.status === 'complete' ? (
                    <span className="text-green-400 text-sm">✓ Done</span>
                  ) : file.status === 'uploading' ? (
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : file.status === 'error' ? (
                    <span className="text-red-400 text-sm">Error</span>
                  ) : (
                    <span className="text-gray-500 text-sm">Pending</span>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.id)}
                  disabled={file.status === 'uploading'}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
        <h3 className="text-lg font-bold text-[#D4AF37] mb-3">📋 How It Works</h3>
        <ol className="space-y-2 text-gray-400">
          <li>
            1. <strong className="text-white">Select destination</strong> - Choose where files
            should be placed
          </li>
          <li>
            2. <strong className="text-white">Drop files</strong> - Drag & drop or click to select
            files
          </li>
          <li>
            3. <strong className="text-white">Customize per file</strong> - Change destination for
            individual files if needed
          </li>
          <li>
            4. <strong className="text-white">Upload</strong> - Click "Upload All" to process
          </li>
        </ol>
      </div>
    </div>
  );
}
